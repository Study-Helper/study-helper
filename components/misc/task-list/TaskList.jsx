import React from 'react';
import { List, ListItem } from 'material-ui/List';
import CategoryAvatar from '../CategoryAvatar.js';
import Avatar from 'material-ui/Avatar';
import PlayArrow from 'material-ui/svg-icons/AV/play-arrow';
import Done from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import TaskDescription from './TaskDescription.jsx';
import MoreOptionsButton from '../MoreOptionsButton.jsx';
import { taskList } from '../../../styles/styles.css.js';

// TODO: Why isn't CategoryAvatar working?
import categories from '../../../server/categories.js';
const getCategoryAvatarData = (category) => categories[category];
// -------------------------------------------------------------------

const TaskList = ({ tasks }) => (
  <List style={taskList.list}>
    {tasks.map((task, index) =>
      <ListItem
        key={index}
        leftAvatar={<Avatar
          size={35}
          icon={getCategoryAvatarData(task.category).icon}
          backgroundColor={getCategoryAvatarData(task.category).backgroundColor}
          style={taskList.avatar}
        />}
        // leftAvatar={<CategoryAvatar category={task.category} />}
        primaryText={task.text}
        secondaryText={task.estimatedDuration}
        nestedItems={[<TaskDescription key={1} task={task} />]}>
        <MoreOptionsButton options={['Edit', 'Remove']} />
        <IconButton tooltip='Check!' style={taskList.iconButton}><Done /></IconButton>
        <IconButton tooltip='Start!' style={taskList.iconButton}><PlayArrow /></IconButton>
      </ListItem>
    )}
  </List>
);

export default TaskList;
