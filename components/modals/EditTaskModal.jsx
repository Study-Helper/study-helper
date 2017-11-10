import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/* Import stuff for the editable fields inside the modal. */
import TextField from 'material-ui/TextField';
import TaskManager from '../../server/managers/TaskManager.js';

/* Use PubSub to handle modal popups. */
import PubSub from 'pubsub-js';

class EditTaskModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false, forTask: null }
    this.closeWithoutSave = this.closeWithoutSave.bind(this);
    this.closeAndSave = this.closeAndSave.bind(this);
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
    PubSub.unsubscribe(token);
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
    this.setState({ open: false });
    const task = this.state.forTask;
    const { newName, newDescription, newCategory } = this.editedValues;
    // Update only if the values actually changed.
    if (newName && task.name !== newName) {
      TaskManager.updateName(task, newName);
    }
    if (newDescription && task.description !== newDescription) {
      TaskManager.updateDescription(task, newDescription);
    }
    if (newCategory && task.category !== newCategory) {
      TaskManager.updateCategory(task, newCategory);
    }
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
      <Dialog
        title='Edit Task'
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.closeWithoutSave}
      >
        <TextField
          defaultValue={name} 
          floatingLabelText="Task Name" 
          onChange={(e, newValue) => this.editedValues.newName = newValue}
        /><br />
        <TextField 
          defaultValue={description}
          floatingLabelText="Task Description" 
          onChange={(e, newValue) => this.editedValues.newDescription = newValue}
        /><br />
      </Dialog>
    );
  }
}

export default EditTaskModal;
