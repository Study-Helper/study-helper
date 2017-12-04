import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TaskManager from '../../../server/managers/TaskManager.js';

/* Use PubSub to handle modal popups. */
import PubSub from 'pubsub-js';

const UNDO_TIME_MS = 3000

class RemoveAllTasksModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tasks: null,
      location: undefined,
      shouldRenderSnackbar: false,
      tasksWereRescued: false
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
  static openSelf(location) {
    PubSub.publish('Open Remove Tasks Bulk Modal', { location });
  }

  componentWillMount() {
    this.token = PubSub.subscribe(
      'Open Remove Tasks Bulk Modal',
      (message, data) => this.setState({
        open: true,
        location: data.location,
        tasks: data.location === 'completed_tasks'
          ? TaskManager.loadStoredCompletedTasks()  // Hackiest code ever!
          : TaskManager.loadStoredDeletedTasks()    // The weirdest bugs were biting!!
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
    if (!this.state.tasksWereRescued) {
      for (const task of this.state.tasks) {
        TaskManager.remove(task, this.state.location);
      }
    } else {
      this.setState({ tasksWereRescued: false });
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

    // Prepare the parameters for the publishing.
    const eventName = 'History - Removed All Tasks';
    const eventData = { removedTasksLocation: this.state.location }

    // Simply publish the event. Only one (RegularTaskList or HistoryTaskList) will
    // be interested in the event.
    // Physicall removals will be handled there, to make it easier.
    PubSub.publish(eventName, eventData);
  }

  /** @private */
  closeSnackbar() {
    this.setState({ shouldRenderSnackbar: false });
  }

  handleUndo() {
    this.setState({ shouldRenderSnackbar: false, tasksWereRescued: true });

    // Don't add a new task to the JSON, as it was never actually deleted.
    const addedTasks = this.state.tasks;
    const location = this.state.location;

    // Prepare the data for the publishing.
    const eventName = 'History - Added Back All Tasks';
    const eventData = { addedTasks, addedTasksLocation: location };

    // Publish the event.
    PubSub.publish(eventName, eventData);
  }

  /** @private */
  actions() {
    return [
      <FlatButton
        secondary
        label='Cancel'
        onClick={this.closeWithoutSave}
      />,
      <FlatButton
        primary
        label='Clear All'
        onClick={this.closeAndSave}
      />,
    ];
  }

  render() {
    if (!this.state.tasks) return null;
    const actions = this.actions();
    const simpleSectionString = this.state.location.split('_')[0];
    return (
      <div>
        <Dialog
          title='Warning'
          actions={actions}
          open={this.state.open}
          onRequestClose={this.closeWithoutSave}
        >
          Are you sure you want to clear all {simpleSectionString} tasks?
        </Dialog>
        <Snackbar
          style={{marginLeft: '70px'}}
          open={this.state.shouldRenderSnackbar}
          message='Your tasks were deleted!'
          action='undo'
          autoHideDuration={UNDO_TIME_MS}
          onActionTouchTap={this.handleUndo}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default RemoveAllTasksModal;
