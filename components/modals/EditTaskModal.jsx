import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

/* Import stuff for the editable fields inside the modal. */
import TextField from 'material-ui/TextField';
import TaskManager from '../../server/managers/TaskManager.js';

/* Use PubSub to handle modal popups. */
import PubSub from 'pubsub-js';

class EditTaskModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      forTask: null,
      shouldRenderSnackbar: false
    }

    this.closeWithoutSave = this.closeWithoutSave.bind(this);
    this.closeAndSave = this.closeAndSave.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);

    // Temporary changes whilst editing the task.
    // Don't save on the component's local state!
    this.editedValues = {
      newName: '',
      newDescription: '',
      newCategory: ''
    }
  }

  /**
   * Call this function to open the Edit Task Modal.
   */
  static openSelf(task) {
    PubSub.publish('Open Edit Task Modal', task);
  }

  componentWillMount() {
    this.token = PubSub.subscribe(
      'Open Edit Task Modal',
      (message, task) => this.setState({ open: true, forTask: task })
    );
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  /** @private */
  closeWithoutSave() {
    this.setState({ open: false });
    this.editedValues = {
      newName: '',
      newDescription: '',
      newCategory: ''
    }
  }

  /** @private */
  closeAndSave() {
    this.setState({ open: false, shouldRenderSnackbar: true });
    // We'll be comparing (previous -> new) values.
    const task = this.state.forTask;
    const { newName, newDescription, newCategory } = this.editedValues;
    // Update only if the values actually changed.
    // Saving directly to the file everytime is not a great idea,
    // but it's the easiest way right now... :(
    let somethingChanged = false;
    if (newName && task.name !== newName) {
      task.name = newName;
      somethingChanged = true;
      TaskManager.updateName(task, newName);
    }
    if (newDescription && task.description !== newDescription) {
      task.description = newDescription;
      somethingChanged = true;
      TaskManager.updateDescription(task, newDescription);
    }
    if (newCategory && task.category !== newCategory) {
      task.category = newCategory;
      somethingChanged = true;
      TaskManager.updateCategory(task, newCategory);
    }
    // This event will be caught by a TaskList object.
    if (somethingChanged) {
      PubSub.publish('Task Updated', task);
    }
  }

  /** @private */
  closeSnackbar() {
    this.setState({ shouldRenderSnackbar: false });
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
        label='Save'
        primary={true}
        onClick={this.closeAndSave}
      />,
    ];
  }

  render() {
    if (!this.state.forTask) return null;
    const actions = this.actions();
    const { name, description, category } = this.state.forTask;
    return (
      <div>
        <Dialog
          title='Edit Task'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeWithoutSave}
        >
          <TextField
            fullWidth
            defaultValue={name} 
            floatingLabelText="Task Name" 
            onChange={(e, newValue) => this.editedValues.newName = newValue}
          /><br />
          <TextField
            fullWidth
            defaultValue={description}
            floatingLabelText="Task Description" 
            onChange={(e, newValue) => this.editedValues.newDescription = newValue}
          /><br />
          {/* TODO: Categories */}
          {/* TODO: Estimated Duration */}
        </Dialog>
        <Snackbar
          open={this.state.shouldRenderSnackbar}
          message='Task successfuly modified!'
          autoHideDuration={2000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default EditTaskModal;
