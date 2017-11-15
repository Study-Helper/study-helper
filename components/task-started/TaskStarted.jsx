import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Done from 'material-ui/svg-icons/action/done';
import Pause from 'material-ui/svg-icons/av/pause';
import Stop from 'material-ui/svg-icons/av/stop';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import FlatButton from 'material-ui/FlatButton';

import TaskDescription from '../list/TaskDescription.jsx';
import Timer from './Timer.jsx';
import CategoryManager from '../../server/managers/CategoryManager.jsx';
import { appbar } from '../../styles/styles.css.js';

class TaskStarted extends Component {

  constructor(props) {
    super(props);
    this.state = { paused: false, wasPaused: undefined, open: false };
    this.changeStatus = this.changeStatus.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.confirmStopTask = this.confirmStopTask.bind(this);
    this.stopTask = this.stopTask.bind(this);
    this.checkTask = this.checkTask.bind(this);
  }

  changeStatus() {
    this.setState({ paused: !this.state.paused });
  }

  confirmStopTask() {
    const { wasPaused, paused } = this.state;
    const result = (wasPaused === undefined || paused === false);
    this.setState({ paused: true, open: true, wasPaused: !result });
  }

  stopTask() {
    this.handleClose();
    this.props.history.push('/home');
  }

  checkTask() {
    this.props.history.push({
      pathname: '/home',
      state: { from: 'task-started', task: this.props.location.state.task }
    });
  }

  handleOpen() {
   this.setState({ open: true });
  }

  handleClose() {
    const paused = this.state.wasPaused;
    this.setState({ paused, open: false });
  }

  render() {
    const { task, taskList } = this.props.location.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.stopTask}
      />,
    ];
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{ marginLeft: '15px' }} text={"It's time to work hard!"} />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
        </Toolbar>
        <ListItem
          primaryText={task.name}
          secondaryText={task.estimatedDuration}
          nestedItems={[<TaskDescription key={1} task={task} />]}
          leftAvatar={<Avatar
            size={35}
            icon={CategoryManager.getCategoryIconFromString(task.category)}
            backgroundColor={CategoryManager.getCategoryBackgroundColorFromString(task.category)}
            style={taskList.avatar}
          />}
        >
          <IconButton
            tooltip='Check!'
            onClick={() => this.checkTask()}
            style={taskList.iconButton}
          >
            <Done />
          </IconButton>
          <IconButton
            tooltip='Stop!'
            onClick={() => this.confirmStopTask()}
            style={taskList.iconButton}
          >
            <Stop />
          </IconButton>
          {
            this.state.paused ?
            <IconButton
              tooltip='Start!'
              onClick={() => this.changeStatus()}
              style={taskList.iconButton}
            >
              <PlayArrow />
            </IconButton> :
            <IconButton
              tooltip='Pause!'
              onClick={() => this.changeStatus()}
              style={taskList.iconButton}
            >
              <Pause />
            </IconButton>
          }
        </ListItem>
        <Timer paused={this.state.paused} />
        <Dialog
          title="Warning"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to stop this task?
        </Dialog>
      </div>
    );
  }
}

export default TaskStarted;
