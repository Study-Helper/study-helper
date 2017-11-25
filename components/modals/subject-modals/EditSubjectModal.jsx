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

class EditSubjectModal extends React.Component {

	constructor(props) {
    	super(props);
     	this.state = {
       		open: false,
   			forSubject: null,
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

   	/**
     * Call this function to open the Edit Task Modal.
    */
   	static openSelf(subject, subjectLocation = 'subjects') {
   		PubSub.publish('Open Edit Subject Modal', { subject, subjectLocation });
   	}

   	componentWillMount() {
    	this.token = PubSub.subscribe(
       		'Open Edit Subject Modal',
       		(message, data) => this.setState({
         		open: true,
         		forSubject: data.subject,
         		subjectLocation: data.subjectLocation
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

     	const subject = this.state.forSubject;
     	const { newName, newImage } = this.editedValues;

     	let somethingChanged = false;
     	if (newName && subject.name !== newName) {
       		subject.name = newName;
       		somethingChanged = true;
       		SubjectManager.updateName(subject, newName, this.state.subjectLocation);
     	}
     	if (newImage && subject.image !== newImage) {
       		subject.image = newImage;
       		somethingChanged = true;
       		SubjectManager.updateImage(subject, newImage, this.state.subjectLocation);
     	}

     	if (somethingChanged) {
       		PubSub.publish('Subject Updated', {
         		editedSubject: subject,
         		editedSubjectLocation: this.state.subjectLocation
       	  });
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
	    if (!this.state.forSubject) return null;
	    const actions = this.actions();
	    const { name, image } = this.state.forSubject;
	    return (
	        <div>
	        	<Dialog
	           		title='Edit Subject'
	           		actions={actions}
	           		modal={false}
	           		open={this.state.open}
	           		onRequestClose={this.closeWithoutSave}
	         	>
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
                  			category={this.state.forSubject.image}
                  		/>
		            </div>
	         	</Dialog>
	         	<Snackbar
	           		open={this.state.shouldRenderSnackbar}
	           		message='Subject successfuly modified!'
	           		autoHideDuration={2000}
	           		onRequestClose={this.closeSnackbar}
	         	/>
	       	</div>
	    );
	}
}

 export default EditSubjectModal;
