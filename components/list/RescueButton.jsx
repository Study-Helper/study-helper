import React from 'react';
import moment from 'moment';
import Rescue from 'material-ui/svg-icons/content/redo';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import TaskManager from '../../server/managers/TaskManager.js';
import Dialog from 'material-ui/Dialog';
import DatePicker from '../calendar/DatePicker.jsx';
import { taskList } from '../../styles/styles.css.js';

const UNDO_TIME_MS = 3000

class RescueButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forTask: props.task,
      indexInTheList: props.indexInTheList,
      shouldRenderSnackbar: false,
      taskWasRescued: false,
      datePickerOpen: false,
      rescueStartDate: moment().format('YYYY-MM-DD'),
      rescueEndDate: moment().format('YYYY-MM-DD')
    }
    this.rescue = this.rescue.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.onUndoTimeOut = this.onUndoTimeOut.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
    this.cancelDatePicker = this.cancelDatePicker.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  rescue() {
    this.setState({ shouldRenderSnackbar: true, datePickerOpen: false });

    // After {UNDO_TIME_MS} miliseconds, erase the task if it wasn't rescued.
    setTimeout(this.onUndoTimeOut, UNDO_TIME_MS);

    // Update the start/end date fields of the to-be-rescued task.
    const { rescueStartDate, rescueEndDate } = this.state;
    this.state.forTask.startDate = rescueStartDate;
    this.state.forTask.endDate = rescueEndDate;

    // Prepare the parameters for the publishing.
    const eventName = 'History - Task Removed';
    const eventData = {
      removedTask: this.state.forTask,
      removedTaskLocation: this.props.taskLocation
    }

    // Publish the event.
    PubSub.publish(eventName, eventData);

    // Add the task to 'todo_tasks'.
    TaskManager.add(this.state.forTask, 'todo_tasks');
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
      TaskManager.remove(this.state.forTask, this.props.taskLocation);
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
    const eventName = 'History - Task Added';
    const eventData = {
      addedTask,
      indexInTheList,
      addedTaskLocation: this.props.taskLocation
    }
    
    // Publish the event.
    PubSub.publish(eventName, eventData);

    // False alarm; remove from 'todo_tasks'.
    TaskManager.remove(addedTask, 'todo_tasks');
  }

  /** @private */
  openDatePicker() {
    this.setState({ datePickerOpen: true });
  }

  /** @private */
  cancelDatePicker() {
    this.setState({ datePickerOpen: false }); 
  }

  /** @private */
  setDate(startDate, endDate) {
    this.setState({ rescueStartDate: startDate, rescueEndDate: endDate });
  }

  /** @private */
  datePickerModalActions() {
    return [
      <FlatButton
        secondary
        label='Cancel'
        onClick={this.cancelDatePicker}
      />,
      <FlatButton
        primary
        label='Confirm'
        onClick={this.rescue}
      />,
    ];
  }

  render() {
    return (
      <div>
        <IconButton 
          tooltip="Rescue!"
          style={taskList.iconButton}
          onClick={this.openDatePicker}
        >
          <Rescue color={'#616161'} />
        </IconButton>
        <Snackbar
          style={{marginLeft: '70px'}}
          open={this.state.shouldRenderSnackbar}
          message="Your task was rescued!"
          action="undo"
          autoHideDuration={UNDO_TIME_MS}
          onActionTouchTap={this.handleUndo}
          onRequestClose={this.closeSnackbar}
        />
        <Dialog
          title="Rescuing Task - Choose a Date"
          actions={this.datePickerModalActions()}
          open={this.state.datePickerOpen}
          onRequestClose={this.cancelDatePicker}
        >
          <DatePicker
            startDate={this.state.rescueStartDate}
            endDate={this.state.rescueEndDate}
            onChange={this.setDate}
          />
        </Dialog>
      </div>
    );
  }
}

export default RescueButton;
