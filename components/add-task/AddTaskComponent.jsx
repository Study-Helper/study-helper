import React from 'react';
import IconButton from 'material-ui/IconButton';
import GoBack from 'material-ui/svg-icons/navigation/chevron-left';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { appbar } from '../../styles/styles.css.js';

import TextField from 'material-ui/TextField';
import CategoryPicker from './category/CategoryPicker.jsx';
import Divider from 'material-ui/Divider';

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
        <div style={{marginLeft: '20px', marginRight: '20px'}}>
          <TextField
            fullWidth
            hintText={'Title'}
            floatingLabelText="Task Title" 
          />
          <CategoryPicker />
          <br />
          <p style={{
            fontSize: 'small',
            fontFamily: 'Roboto',
            color: 'rgba(0, 0, 0, 0.87)',
          }}>Optional</p>
          <TextField hintText="First name" style={{marginLeft: '20'}} underlineShow={false} />
          <Divider />
          <TextField hintText="Middle name" style={{marginLeft: '20'}} underlineShow={false} />
          <Divider />
        </div>
      </div>
    );
  }
}

export default AddTaskComponent;
