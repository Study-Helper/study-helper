import React from 'react';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import Done from 'material-ui/svg-icons/action/done';
import TaskManager from '../../server/managers/TaskManager.js';
import { taskList } from '../../styles/styles.css.js';

/* Use PubSub to handle modal popups. */
import PubSub from 'pubsub-js';

const UNDO_TIME_MS = 3000

class CheckButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forTask: props.task,
      indexInTheList: props.indexInTheList,
      shouldRenderSnackbar: false,
      taskWasRescued: false
    }
    this.check = this.check.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.onUndoTimeOut = this.onUndoTimeOut.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
  }

  /** @private */
  check() {
    this.setState({ shouldRenderSnackbar: true });
    // After {UNDO_TIME_MS} miliseconds, erase the task if it wasn't rescued.
    setTimeout(this.onUndoTimeOut, UNDO_TIME_MS);
    // Logically remove, don't actually erase from the JSON.
    PubSub.publish('Task Removed', this.state.forTask);
  }

  /** @private */
  closeSnackbar() {
    console.log("onRequestClose")
    this.setState({ shouldRenderSnackbar: false });
  }

  /**
   * After {UNDO_TIME_MS} miliseconds, if the removed task was not rescued (i.e. the
   * undo button wasn't clicked), then actually erase the task from the JSON.
   * @private
   */
  onUndoTimeOut() {
    console.log("Undo Timeout")
    if (!this.state.taskWasRescued) {
      TaskManager.checkTask(this.state.forTask);
    }
  }

  handleUndo() {
    console.log("Handling undo")
    this.setState({ shouldRenderSnackbar: false, taskWasRescued: true });
    // Don't add a new task to the JSON, as it was never actually deleted.
    const addedTask = this.state.forTask;
    const indexInTheList = this.state.indexInTheList;
    PubSub.publish('Task Added', { addedTask, indexInTheList });
  }

  render() {
    console.log(this.state.shouldRenderSnackbar)
    return (
      <div>
        <IconButton 
          tooltip='Check!'
          style={taskList.iconButton}
          onClick={this.check}
        >
          <Done />
        </IconButton>
        <Snackbar
          open={this.state.shouldRenderSnackbar}
          message='Your task was completed!'
          action='undo'
          autoHideDuration={UNDO_TIME_MS}
          onActionTouchTap={this.handleUndo}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    )
  }
}

export default CheckButton;
