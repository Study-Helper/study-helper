import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { Scrollbars } from 'react-custom-scrollbars';
import TextField from 'material-ui/TextField';
import HistoryTaskList from '../list/HistoryTaskList.jsx';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import Snackbar from 'material-ui/Snackbar';
import Search from 'material-ui/svg-icons/action/search';
import TaskManager from '../../server/managers/TaskManager.js';

import { appbar } from '../../styles/styles.css.js';

class TaskHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deletedTasks: TaskManager.loadStoredDeletedTasks(),
      completedTasks: TaskManager.loadStoredCompletedTasks(),
      shouldRenderSnackbar: false,
      snackbarMessage: ''
    }
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  componentWillMount() {
    let location = this.props.location;

    if (location && location.state) {
      if (location.state.noRender) return;

      const { from, task } = location.state;
      const message = 'Task edited!';

      setTimeout(() => this.setState({
        shouldRenderSnackbar: true,
        snackbarMessage: message
      }), 50);
    }
  }

  /** @private */
  closeSnackbar() {
    this.setState({ shouldRenderSnackbar: false });
  }

  render() {
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={appbar.header} text="Task History" />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            {
              this.state.deletedTasks.length > 0 &&
              <div style={{position: 'relative', display: 'inline-block'}}>
                <Search style={{position: 'absolute', left: 0, top: 15, width: 20, height: 20, color: '#757575'}}/>
                <TextField hintText="Search" style={{textIndent: 30, width: '120px', float: 'right', marginRight: '30px'}}/>
              </div>
            }
          </ToolbarGroup>
        </Toolbar>
        {
          this.state.deletedTasks.length > 0 &&
          <Scrollbars style={{ width: 697, height: 550 }}>
            <HistoryTaskList
              deletedTasks={this.state.deletedTasks}
              completedTasks={this.state.completedTasks}
              history={this.props.history} // Pass the history for some crazy hacks
            />
          </Scrollbars>
        }
        <Snackbar
          style={{marginLeft: '70px'}}
          open={this.state.shouldRenderSnackbar}
          message={this.state.snackbarMessage}
          autoHideDuration={2000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default TaskHistory;