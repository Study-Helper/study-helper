import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import { Scrollbars } from 'react-custom-scrollbars';
import TextField from 'material-ui/TextField';
import HistoryTaskList from '../list/HistoryTaskList.jsx';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import Clear from 'material-ui/svg-icons/action/delete-forever';
import Search from 'material-ui/svg-icons/action/search';
import TaskManager from '../../server/managers/TaskManager.js';

import { appbar } from '../../styles/styles.css.js';

class TaskHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deletedTasks: TaskManager.loadStoredDeletedTasks(),
      completedTasks: TaskManager.loadStoredCompletedTasks()
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
              this.state.deletedTasks.length > 0 &&
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
          this.state.deletedTasks.length > 0 &&
          <Scrollbars style={{ width: 697, height: 550 }}>
            <HistoryTaskList
              deletedTasks={this.state.deletedTasks}
              completedTasks={this.state.completedTasks}
            />
          </Scrollbars>
        }
      </div>
    );
  }
}

export default TaskHistory;