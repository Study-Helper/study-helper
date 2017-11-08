import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TaskList from '../misc/task-list/TaskList.jsx';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Add from 'material-ui/svg-icons/content/add';
import Search from 'material-ui/svg-icons/action/search';
import { appbar } from '../../styles/styles.css.js';
import tasks from '../../server/tasks.js';

import TaskManager from '../../server/managers/TaskManager.js';

class Today extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{'marginLeft': '15px'}} text="Today" />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <div style={{position: 'relative', display: 'inline-block'}}>
              <Search style={{position: 'absolute', left: 0, top: 15, width: 20, height: 20, color: 'red'}}/>
              <TextField hintText="Search" style={{textIndent: 30, 'width':'120px', paddingRight: 30}}/>
            </div>
            <RaisedButton 
              label="Add Task"
              labelPosition="before"
              primary
              icon={<Add/>}
            />
          </ToolbarGroup>
        </Toolbar>
        <TaskList tasks={tasks} />
      </div>
    );
  }
}

export default Today;