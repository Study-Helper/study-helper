import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TaskManager from '../../server/managers/TaskManager.js';

/* Use PubSub to handle modal popups. */
import PubSub from 'pubsub-js';

const UNDO_TIME_MS = 3000

class RemoveTaskModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      forTask: null,
      indexInTheList: -1,
      shouldRenderSnackbar: false,
      taskWasRescued: false
    }
    this.closeWithoutSave = this.closeWithoutSave.bind(this);
    this.closeAndSave = this.closeAndSave.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.onUndoTimeOut = this.onUndoTimeOut.bind(this);
  }

  /**
   * Call this function to open the Remove Task Modal.
   */
  static openSelf(task, indexInTheList) {
    PubSub.publish('Open Remove Task Modal', { task, indexInTheList } );
  }

  componentWillMount() {
    this.token = PubSub.subscribe(
      'Open Remove Task Modal',
      (message, data) => this.setState({
        open: true,
        forTask: data.task,
        indexInTheList: data.indexInTheList
      })
    );
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  /**
   * After {UNDO_TIME_MS} miliseconds, if the removed task was not rescued (i.e. the
   * undo button wasn't clicked), then actually erase the task from the JSON.
   * @private
   */
  onUndoTimeOut() {
    if (!this.state.taskWasRescued) {
      TaskManager.remove(this.state.forTask);
    }
  }

  /** @private */
  closeWithoutSave() {
    this.setState({ open: false });
  }

  /** @private */
  closeAndSave() {
    this.setState({ open: false, shouldRenderSnackbar: true });
    // After {UNDO_TIME_MS} miliseconds, erase the task if it wasn't rescued.
    setTimeout(this.onUndoTimeOut, UNDO_TIME_MS);
    // Logically remove, don't actually erase from the JSON.
    PubSub.publish('Task Removed', this.state.forTask);
  }

  /** @private */
  closeSnackbar() {
    this.setState({ shouldRenderSnackbar: false });
  }

  handleUndo() {
    this.setState({ shouldRenderSnackbar: false, taskWasRescued: true });
    // Don't add a new task to the JSON, as it was never actually deleted.
    const addedTask = this.state.forTask;
    const indexInTheList = this.state.indexInTheList;
    PubSub.publish('Task Added', { addedTask, indexInTheList });
  }

  /** @private */
  actions() {
    return [
      <FlatButton
        label='Cancel'
        primary={true}
        onClick={this.closeWithoutSave}
      />,
      <FlatButton
        label='Ok'
        primary={true}
        onClick={this.closeAndSave}
      />,
    ];
  }

  render() {
    if (!this.state.forTask) return null;
    const actions = this.actions();
    return (
      <div>
        <Dialog
          title='Warning'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeWithoutSave}
        >
          Are you sure you want to delete this task?
        </Dialog>
        <Snackbar
          open={this.state.shouldRenderSnackbar}
          message='Your task was deleted!'
          action='undo'
          autoHideDuration={UNDO_TIME_MS}
          onActionTouchTap={this.handleUndo}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default RemoveTaskModal;
