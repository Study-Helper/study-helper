import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TaskList from '../list/TaskList.jsx';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import Clear from 'material-ui/svg-icons/action/delete';
import Search from 'material-ui/svg-icons/action/search';
import TaskManager from '../../server/managers/TaskManager.js';

import { appbar } from '../../styles/styles.css.js';

class TaskHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      missedTasks: TaskManager.loadMissedTasks()
    }
  }

  render() {
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{'marginLeft': '15px'}} text="Task History" />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            {
              this.state.missedTasks.length > 0 &&
              <div style={{position: 'relative', display: 'inline-block'}}>
                <Search style={{position: 'absolute', left: 0, top: 15, width: 20, height: 20, color: 'red'}}/>
                <TextField hintText="Search" style={{textIndent: 30, 'width':'120px', paddingRight: 30}}/>
              </div>
            }
            <RaisedButton 
              label="Clear All"
              labelPosition="before" 
              primary 
              icon={<Clear/>}
            />
          </ToolbarGroup>
        </Toolbar>
        {
          this.state.missedTasks.length > 0 ?
          <TaskList tasks={this.state.missedTasks} /> :
          <div style={{ textAlign: 'center', fontFamily: 'Roboto', marginTop: '30px' }}>
            <div><ErrorIcon /></div>
            <div>No tasks to show</div>
          </div>
        }
      </div>
    );
  }
}

export default TaskHistory;