import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';

const WrappedApp = () => (
  <MuiThemeProvider>
    <div>
      <div style={styles.logoLayout}>
        <img src="assets/pen-5.png" width="100" height="100" />
      </div>
      <p style={styles.header}>Study Helper</p>
      <p style={styles.subheader}>Getting everything ready for you...</p>
      <CircularProgress style={styles.progress} size={30} thickness={3} />
    </div>
  </MuiThemeProvider>
);

window.onload = function() {
  ReactDOM.render(<WrappedApp />, document.getElementById('splash-screen'));
}

const styles = {
  logoLayout: {
    margin: '40px 0 0 165px'
  },
  header: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: '135%'
  },
  subheader: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    marginTop: '-15px',
    fontSize: '90%',
    color: '#BDBDBD'
  },
  progress: {
    paddingTop: '10px',
    marginLeft: '185px'
  }
}
