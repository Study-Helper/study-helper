import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SubjectManager from '../../../server/managers/SubjectManager.js';

/* Use PubSub to handle modal popups. */
import PubSub from 'pubsub-js';

const UNDO_TIME_MS = 3000

class RemoveSubjectModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      forSubject: null,
      subjectLocation: 'subjects',
      indexInTheList: -1,
      shouldRenderSnackbar: false,
      subjectWasRescued: false
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
  static openSelf(subject, indexInTheList, subjectLocation = 'subjects') {
    PubSub.publish('Open Remove Subject Modal', { subject, indexInTheList, subjectLocation } );
  }

  componentWillMount() {
    this.token = PubSub.subscribe(
      'Open Remove Subject Modal',
      (message, data) => this.setState({
        open: true,
        forSubject: data.subject,
        subjectLocation: data.subjectLocation,
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
    if (!this.state.subjectWasRescued) {
      SubjectManager.remove(this.state.forSubject, this.state.subjectLocation);
    } else {
      this.setState({ subjectWasRescued: false });
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

    // Differentiate between removing from 'RegularTaskList' and 'HistoryTaskList'.
    const location = this.state.subjectLocation;

    // Prepare the parameters for the publishing.
    const eventName = 'Subject Removed';
    const eventData = {
      removedSubject: this.state.forSubject,
      removedSubjectLocation: this.state.subjectLocation
    }

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
    this.setState({ shouldRenderSnackbar: false, subjectWasRescued: true });

    // Don't add a new task to the JSON, as it was never actually deleted.
    const addedSubject = this.state.forSubject;
    const indexInTheList = this.state.indexInTheList;
    const location = this.state.subjectLocation;

    // Prepare the data for the publishing.
    const eventName = 'Subject Added';
    const eventData = {
      addedSubject,
      indexInTheList,
      addedSubjectLocation: this.state.subjectLocation
    }

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
        label='Remove'
        onClick={this.closeAndSave}
      />,
    ];
  }

  render() {
    if (!this.state.forSubject) return null;
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
          Are you sure you want to remove subject "{this.state.forSubject.name}"?
        </Dialog>
        <Snackbar
          open={this.state.shouldRenderSnackbar}
          message='Your subject was deleted!'
          action='undo'
          autoHideDuration={UNDO_TIME_MS}
          onActionTouchTap={this.handleUndo}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default RemoveSubjectModal;
