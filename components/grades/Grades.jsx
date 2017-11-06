import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import Add from 'material-ui/svg-icons/content/add';

import { appbar } from '../../styles/styles.css.js';

class Today extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toolbar style={appbar.barLayout}>
        <ToolbarGroup firstChild>
          <ToolbarTitle style={{'marginLeft': '15px'}} text="Grades" />
          <FontIcon className="muidocs-icon-custom-sort" />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          <RaisedButton 
            label="Add Subject"
            labelPosition="before"
            primary
            icon={<Add/>}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Today;