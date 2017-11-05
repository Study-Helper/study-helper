import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import { appbar } from '../styles/styles.css.js';

class Today extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toolbar style={appbar.barLayout}>
        <ToolbarGroup firstChild>
          <ToolbarTitle style={{'marginLeft': '15px'}} text="Today" />
          <FontIcon className="muidocs-icon-custom-sort" />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          <TextField hintText="Search..." style={{'width':'90px'}} />
          <RaisedButton label="Add Task" primary />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Today;