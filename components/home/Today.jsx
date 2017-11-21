import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline';
import RegularTaskList from '../list/RegularTaskList.jsx';
import AddTaskButton from '../add-task/AddTaskButton.jsx';
import Search from 'material-ui/svg-icons/action/search';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import { appbar } from '../../styles/styles.css.js';
import Snackbar from 'material-ui/Snackbar';
import TaskManager from '../../server/managers/TaskManager.js';

class Today extends React.Component {

  constructor(props) {
    super(props);
    // Synchronously load "today's" tasks.
    this.state = {
      tasks: TaskManager.loadTasksByDate('2017-09-05'),
      shouldRenderSnackbar: false,
      snackbarMessage: ''
    }
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  componentWillMount() {
    const { location } = this.props;
    if (location && location.state) {
      const { from, task } = this.props.location.state;
      const message = from === 'task-started' ? 'Task completed!' : 'Task added!'
      setTimeout(() => this.setState({
        shouldRenderSnackbar: true,
        snackbarMessage: message
      }), 150);
    }
  }

  componentWillReceiveProps(nextProps) {
    //TODO: consider endDate (range[1])
    const { range } = nextProps;
    const date = range ? range[0] : '2017-09-05';
    this.setState({
      tasks: TaskManager.loadTasksByDate(date)
      // tasks: TaskManager.loadTasksByDate(range[0])
    });
  }

  /** @private */
  closeSnackbar() {
    this.setState({ shouldRenderSnackbar: false });
  }

  render() {
    const { title, height } = this.props;
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{marginLeft: '15px'}} text={title || 'Today'} />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            {
              this.state.tasks.length > 0 &&
              <div style={{position: 'relative', display: 'inline-block'}}>
                <Search style={{position: 'absolute', left: 0, top: 15, width: 20, height: 20, color: 'red'}}/>
                <TextField hintText="Search" style={{textIndent: 30, width:'120px', paddingRight: 30}}/>
              </div>
            }
            <AddTaskButton startDate={'2017-09-05'} endDate={'2017-09-05'} />
          </ToolbarGroup>
        </Toolbar>
        {
          this.state.tasks.length > 0 ?
          <Scrollbars style={{ width: 697, height: height || 540 }}>
            <RegularTaskList tasks={this.state.tasks} />
          </Scrollbars> :
          <div style={{ textAlign: 'center', fontFamily: 'Roboto', marginTop: '50px' }}>
            <div><ErrorIcon /></div>
            <div>No tasks to show!</div>
          </div>
        }
        <Snackbar
          open={this.state.shouldRenderSnackbar}
          message={this.state.snackbarMessage}
          autoHideDuration={2000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

Today.propTypes = {
  title: PropTypes.string,
  range: PropTypes.array,
  height: PropTypes.number,
};

export default Today;
