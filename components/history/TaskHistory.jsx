import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import Clear from 'material-ui/svg-icons/action/delete';
import Search from 'material-ui/svg-icons/action/search';

import { appbar } from '../../styles/styles.css.js';

class TaskHistory extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toolbar style={appbar.barLayout}>
        <ToolbarGroup firstChild>
          <ToolbarTitle style={{'marginLeft': '15px'}} text="Task History" />
          <FontIcon className="muidocs-icon-custom-sort" />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          <div style={{position: 'relative', display: 'inline-block'}}>
            <Search style={{position: 'absolute', left: 0, top: 15, width: 20, height: 20, color: 'red'}}/>
              <TextField hintText="Search" style={{textIndent: 30, 'width':'120px', paddingRight: 30}}/>
          </div>
          <RaisedButton 
            label="Clear All"
            labelPosition="before" 
            primary 
            icon={<Clear/>}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default TaskHistory;