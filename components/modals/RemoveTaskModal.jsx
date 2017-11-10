import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TaskManager from '../../server/managers/TaskManager.js';

/* Use PubSub to handle modal popups. */
import PubSub from 'pubsub-js';

class RemoveTaskModal extends React.Component {

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
    this.handleActionTouchTap = this.handleActionTouchTap.bind(this);
  }

  /**
   * Call this function to open the Remove Task Modal.
   */
  static openSelf(task) {
    PubSub.publish('Open Remove Task Modal', task);
  }

  componentWillMount() {
    this.token = PubSub.subscribe(
      'Open Remove Task Modal',
      (message, task) => this.setState({ open: true, forTask: task })
    );
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  /** @private */
  closeWithoutSave() {
    this.setState({ open: false });
  }

  /** @private */
  closeAndSave() {
    this.setState({ open: false, shouldRenderSnackbar: true });
    TaskManager.remove(this.state.forTask);
    PubSub.publish('Task Removed', this.state.forTask);
  }

  /** @private */
  closeSnackbar() {
    this.setState({ shouldRenderSnackbar: false });
  }

  handleActionTouchTap() {
    this.setState({ shouldRenderSnackbar: false });
    TaskManager.add(this.state.forTask);
    PubSub.publish('Task Added', this.state.forTask);
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
          autoHideDuration={3000}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default RemoveTaskModal;
