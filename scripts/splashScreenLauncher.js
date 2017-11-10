import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';

import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const WrappedApp = () => (
  <MuiThemeProvider>
    <div>
      <img src="assets/app-icon-256.png" width="200" height="200" />
      <TextField floatingLabelText="Study Helper" />
      <CircularProgress size={60} thickness={7} />
    </div>
  </MuiThemeProvider>
);

window.onload = function() {
  ReactDOM.render(<WrappedApp />, document.getElementById('splash-screen'));
}
