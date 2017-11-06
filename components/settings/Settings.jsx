import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import { appbar } from '../../styles/styles.css.js';

class Settings extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toolbar style={appbar.barLayout}>
        <ToolbarGroup firstChild>
          <ToolbarTitle style={{'marginLeft': '15px'}} text="Settings" />
          <FontIcon className="muidocs-icon-custom-sort" />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Settings;