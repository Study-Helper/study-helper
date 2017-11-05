import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../views/main.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>
);

window.onload = function() {
  ReactDOM.render(<App />, document.getElementById('app'));
}
