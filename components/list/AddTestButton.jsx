import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

/* Import stuff for the editable fields inside the modal. */
import TextField from 'material-ui/TextField';
import SubjectManager from '../../server/managers/SubjectManager.js';

/* Use PubSub to handle modal popups. */
import PubSub from 'pubsub-js';

class AddTestButton extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
          subject: undefined,
          open: false,
          shouldRenderSnackbar: false,
          didFillName: false,
          didFillGrade: false,
          errorMessage: ""
      }
 
      this.closeWithoutSave = this.closeWithoutSave.bind(this);
      this.closeAndSave = this.closeAndSave.bind(this);
      this.closeSnackbar = this.closeSnackbar.bind(this);
      this.getErrorText = this.getErrorText.bind(this);
      this.setErrorMessage = this.setErrorMessage.bind(this);
    
      this.editedValues = {
        newName: '',
        newGrade: ''
      }
    }

  static openSelf(subject) {
    PubSub.publish('Open Add Test Modal', {subject});
  }

  componentWillMount() {
    this.token = PubSub.subscribe(
      'Open Add Test Modal',
      (message, data) => this.setState({
        open: true,
        subject: data.subject
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
        newGrade: ''
    }
  }

  /** @private */
  closeAndSave() {
    this.setState({ open: false, shouldRenderSnackbar: true });
    
    const { newName, newGrade } = this.editedValues;
  
    SubjectManager.addTest(this.state.subject, newName, newGrade);

    PubSub.publish('Subject Updated', {
      editedSubject: this.state.subject
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
          disabled = {!(this.state.didFillName && this.state.didFillGrade)}
          onClick={this.closeAndSave}
        />
    ];
  }

  setErrorMessage(message){
    this.setState({
      errorMessage: message
    });
  }

  getErrorText(){
    return this.state.errorMessage;
  }

  render() {
    const actions = this.actions();
    return (
      <div>
        <Dialog
          title='Add Test'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeWithoutSave}>
            <div style={{'marginLeft': '30px'}}>
              Test:
              <TextField
                floatingLabelText="Name" 
                onChange={(e, newValue) => {
                  if(!(newValue == "")){
                    this.editedValues.newName = newValue;
                    this.setState({
                      didFillName: true
                    });
                  } else {
                    this.setState({
                      didFillName: false
                    });
                  }
                  
                }}
                style = {{'marginLeft':'15px'}}
              />
              <p/>
              <div style={{'width':'100%'}}>
                <div style={{'float':'left', 'width':'100px', 'marginTop':'40px'}}>
                  Grade:
                </div>
                <div style={{'float':'left', 'width':'100px', 'marginLeft':'-40px'}}>
                  <TextField
                    floatingLabelText="Grade" 
                    onChange={(e, newValue) => {
                      let isNumber = newValue;
                      isNumber = newValue/2;
                      if(newValue!=""){
                        if(!isNaN(isNumber)){
                          if(newValue<=20 && newValue>=0){
                            this.editedValues.newGrade = newValue;
                            this.setState({
                              didFillGrade: true
                            });
                            this.setErrorMessage("");
                          } else {
                            this.setState({
                              didFillGrade: false
                            });
                            this.setErrorMessage("Your grade must be beetween 0 and 20!");
                          }
                        } else {
                          this.setState({
                              didFillGrade: false
                          });
                          this.setErrorMessage("Your grade must be a number!");
                        }
                      } else {
                        this.setState({
                            didFillGrade: false
                          });
                      }
                    }}
                    errorText={this.getErrorText()}
                    style={{'width':'248px'}}
                  /> 
                </div>
              </div>
            </div>
        </Dialog>
      
        <Snackbar
          open={this.state.shouldRenderSnackbar}
          message='Test successfuly added!'
          autoHideDuration={2000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default AddTestButton;