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

    // Prepare the data for the publishing.
    const eventName = 'Regular - Task Removed';
    const eventData = {
      removedTask: this.state.forTask,
      removedTaskLocation: this.state.taskLocation
    };

    // Publish the event.
    PubSub.publish(eventName, eventData);

    // Add the task to History's 'completed_tasks'.
    TaskManager.add(this.state.forTask, 'completed_tasks');

    // If we're checking from 'TaskStarted', go back to 'Home'.
    if (this.props.redirectsToHome) {
      this.props.history.push({
        pathname: '/home',
        state: { from: 'task-started' }
      });
    }
  }

  /** @private */
  closeSnackbar() {
    this.setState({ shouldRenderSnackbar: false });
  }

  /**
   * After {UNDO_TIME_MS} miliseconds, if the removed task was not rescued (i.e. the
   * undo button wasn't clicked), then actually erase the task from the JSON.
   * @private
   */
  onUndoTimeOut() {
    if (!this.state.taskWasRescued) {
      TaskManager.remove(this.state.forTask, 'todo_tasks');
    } else {
      this.setState({ taskWasRescued: false });
    }
  }

  handleUndo() {
    this.setState({ shouldRenderSnackbar: false, taskWasRescued: true });
    
    // Don't add a new task to the JSON, as it was never actually deleted.
    const addedTask = this.state.forTask;
    const indexInTheList = this.state.indexInTheList;

    // Prepare the parameters for the publishing.
    const eventName = 'Regular - Task Added';
    const eventData = { addedTask, indexInTheList, addedTaskLocation: 'todo_tasks' };
    
    // Task will be added back to 'todo_tasks'.
    PubSub.publish(eventName, eventData);

    // False alarm; remove the task from History's 'completed_tasks'.
    TaskManager.remove(this.state.forTask, 'completed_tasks');
  }

  render() {
    return (
      <div>
        <IconButton 
          tooltip='Check!'
          style={taskList.iconButton}
          onClick={this.check}
        >
          <Done color={'#757575'}/>
        </IconButton>
        <Snackbar
          style={{marginLeft: '70px'}}
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
