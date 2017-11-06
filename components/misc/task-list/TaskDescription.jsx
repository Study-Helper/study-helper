import React from 'react';
import { ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {taskDescription } from '../../../styles/styles.css.js';

/**
 * Example usage: <TaskDescription task={myTask} />
 */
const TaskDescription = ({ task }) => (
  <ListItem 
    disabled 
    style={taskDescription.description} 
    key={1}
    leftIcon={<ActionInfo style={taskDescription.icon} />}
    secondaryText={task.description}
    secondaryTextLines={2}
  />
);

export default TaskDescription;
