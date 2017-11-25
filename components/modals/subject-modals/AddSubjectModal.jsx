import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

/* Import stuff for the editable fields inside the modal. */
import TextField from 'material-ui/TextField';
import SubjectManager from '../../../server/managers/SubjectManager.js';
import SubjectIconPicker from '../../grades/SubjectIconPicker.jsx';

/* Use PubSub to handle modal popups. */
import PubSub from 'pubsub-js';

class AddSubjectModal extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          open: false,
          shouldRenderSnackbar: false
      }

      this.closeWithoutSave = this.closeWithoutSave.bind(this);
      this.closeAndSave = this.closeAndSave.bind(this);
      this.closeSnackbar = this.closeSnackbar.bind(this);
      this.setNewIcon = this.setNewIcon.bind(this);

      this.editedValues = {
        newName: '',
        newImage: ''
      }
    }

  static openSelf() {
    PubSub.publish('Open Add Subject Modal');
  }

  componentWillMount() {
    this.token = PubSub.subscribe(
      'Open Add Subject Modal',
      () => this.setState({
        open: true
      })
    );
  }

  componentWillUnmount() {
      PubSub.unsubscribe(this.token);
  }

  /** @private */
  closeWithoutSave() {
    this.setState({ open: false });
    this.editedValues = {
        newName: '',
        newImage: ''
    }
  }

  /** @private */
  closeAndSave() {
    this.setState({ open: false, shouldRenderSnackbar: true });

    const { newName, newImage } = this.editedValues;

    let subject = {
        "id": undefined,
        "name": newName,
        "tests": {},
        "mean": 0,
        "image": newImage,
        "color": undefined
    };
    SubjectManager.add(subject, "subjects");
    PubSub.publish('Subject Added', {
      addedSubject: subject
    });
  }

  /** @private */
  closeSnackbar() {
    this.setState({ shouldRenderSnackbar: false });
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
          label='Save'
          onClick={this.closeAndSave}
        />,
    ];
  }

  setNewIcon(icon){
    this.editedValues.newImage = icon;
  }

  render() {
    const actions = this.actions();
    return (
      <div>
        <Dialog
          title='Add Subject'
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.closeWithoutSave}>
            <TextField
              autoFocus
              fullWidth
              defaultValue={name}
              floatingLabelText="Subject Name"
              onChange={(e, newValue) => this.editedValues.newName = newValue}
            />
            <br/>
            <p>Choose an icon</p>
            <div style={{ marginTop: 10 }}>
              <SubjectIconPicker
                onChange={this.setNewIcon}
              />
            </div>
        </Dialog>
        <Snackbar
          open={this.state.shouldRenderSnackbar}
          message='Subject successfuly added!'
          autoHideDuration={2000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }

}

 export default AddSubjectModal;
