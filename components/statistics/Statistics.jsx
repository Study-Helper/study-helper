import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import { appbar, statisticButtons } from '../../styles/styles.css.js';

class Statistics extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{'marginLeft': '15px'}} text="Statistics" />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
        </Toolbar>
        <RaisedButton 
          label="To Do Completed"
          primary
          style={statisticButtons.toDoComplete}
        />
        <RaisedButton 
          label="To Do Incompleted"
          primary
          style={statisticButtons.toDoIncomplete}
        />
        <RaisedButton 
          label="Grades"
          primary
          style={statisticButtons.grades}
        />
      </div>
    );
  }
}

export default Statistics;