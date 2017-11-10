import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/* Use PubSub to handle modal popups. */
import PubSub from 'pubsub-js';

class RemoveTaskModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false, forTask: null }
    this.closeModal = this.closeModal.bind(this);
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
  closeModal() {
    this.setState({ open: false });
  }

  /** @private */
  actions() {
    return [
      <FlatButton
        label='Cancel'
        primary={true}
        onClick={this.closeModal}
      />,
      <FlatButton
        label='Ok'
        primary={true}
        onClick={this.closeModal}
      />,
    ];
  }

  render() {
    if (!this.state.forTask) return null;
    const actions = this.actions();
    return (
      <Dialog
        title='Warning'
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.closeModal}
      >
        Are you sure you want to delete this task?
      </Dialog>
    );
  }
}

export default RemoveTaskModal;
