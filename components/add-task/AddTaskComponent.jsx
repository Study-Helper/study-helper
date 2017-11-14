import React from 'react';
import IconButton from 'material-ui/IconButton';
import GoBack from 'material-ui/svg-icons/navigation/chevron-left';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { appbar, addTask } from '../../styles/styles.css.js';

import TextField from 'material-ui/TextField';
import CategoryPicker from './category/CategoryPicker.jsx';
import RaisedButton from 'material-ui/RaisedButton';

class AddTaskComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const goBack = this.props.history.goBack;
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <IconButton onClick={goBack} tooltip='Back'><GoBack /></IconButton>
            <ToolbarTitle style={{'marginLeft': '15px'}} text='Add Task' />
          </ToolbarGroup>
        </Toolbar>
        <div style={addTask.window}>
          <TextField
            fullWidth
            hintText={'Title'}
            floatingLabelText='Task Title'
            // errorText='This field is required'
          />
          <TextField fullWidth hintText={'TODO: Something for the start/end dates here'} />
          <CategoryPicker />
          <TextField
            fullWidth
            hintText={'Estimated Duration'}
            floatingLabelText='Duration (Optional)'
          />
          <TextField
            fullWidth
            hintText={'Add a Description'}
            floatingLabelText='Description (Optional)' 
          />
          <RaisedButton
            label='Confirm'
            style={addTask.button}
            primary
          />
          <RaisedButton
            label='Cancel'
            onClick={goBack}
            style={addTask.button}
            secondary
          />          
        </div>
      </div>
    );
  }
}

export default AddTaskComponent;
