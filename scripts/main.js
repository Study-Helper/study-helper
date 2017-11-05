import React from 'react';
import ReactDOM from 'react-dom';
import App from '../views/App.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const WrappedApp = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

window.onload = function() {
  ReactDOM.render(<WrappedApp />, document.getElementById('app'));
}
