import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/av/playlist-add';

import { appbar } from '../../styles/styles.css.js';

class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{ marginLeft: '15px' }} text="Categories" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton
              style={{ margin: '0px 25px 0px 20px' }}
              primary
              label='Add Category'
              icon={<Add />}
            />
          </ToolbarGroup>
        </Toolbar>
        <div>Categories Manager Content...</div>
      </div>
    );
  }
}

export default Calendar;
