import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Done from 'material-ui/svg-icons/action/done';
import Pause from 'material-ui/svg-icons/av/pause';
import Stop from 'material-ui/svg-icons/av/stop';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';

import TaskDescription from '../list/TaskDescription.jsx';
import Timer from './Timer.jsx';
import categories from '../../server/categories.js';
import { appbar } from '../../styles/styles.css.js';

class TaskStarted extends Component {

  constructor(props) {
    super(props);
    this.state = { paused: false };
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus() {
    this.setState({ paused: !this.state.paused });
  }

  render() {
    const { task, taskList } = this.props.location.state;
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
            icon={categories[task.category].icon}
            backgroundColor={categories[task.category].backgroundColor}
            style={taskList.avatar}
          />}
        >
          <IconButton tooltip='Check!' style={taskList.iconButton}><Done /></IconButton>
          <IconButton tooltip='Stop!' style={taskList.iconButton}>
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
      </div>
    );
  }
}

export default TaskStarted;
