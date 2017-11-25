import React from 'react';
import { ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/description';
import Info from 'material-ui/svg-icons/action/info-outline';
import { taskDescription } from '../../styles/styles.css.js';

/**
 * Example usage: <TaskDescription task={myTask} />
 */
const TaskDescription = ({ task }) => (
	<ListItem 
	  disabled 
	  style={taskDescription.description} 
	  key={1}
	  leftIcon={
	  	task.description === 'No description available.' ? <Info style={taskDescription.icon} /> :
	  			<ActionInfo style={taskDescription.icon} />}
	  secondaryText={task.description}
	  secondaryTextLines={2}
	/>
);

export default TaskDescription;
