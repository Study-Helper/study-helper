import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PlayArrow from 'material-ui/svg-icons/AV/play-arrow';
import Done from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import TaskDescription from './TaskDescription.jsx';
import MoreOptionsButton from '../more-options/MoreOptionsButton.jsx';
import { taskList } from '../../styles/styles.css.js';
import categories from '../../server/categories.js';

/* Import these to call their static#openSelf. */
import EditTaskModal from '../modals/EditTaskModal.jsx';
import RemoveTaskModal from '../modals/RemoveTaskModal.jsx';

class TaskList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tasks: props.tasks }
  }

  componentWillMount() {
    this.token = PubSub.subscribe(
      'Task Updated',
      (message, updatedTask) => this.setState((prevState, props) => {
        const tasks = prevState.tasks;
        tasks[updatedTask.id - 1] = updatedTask;
        return { tasks: tasks }
      })
    );
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  /** @private */
  getCategoryAvatarData(category) {
    return categories[category];
  }

  /** @private */
  openEditModal(task) {
    EditTaskModal.openSelf(task);
  }

  /** @private */
  openRemoveModal(task) {
    RemoveTaskModal.openSelf(task);
  }

  /** @private */
  editTaskOption(task) {
    return {
      name: 'Edit',
      onClickFunction: () => this.openEditModal(task)
    }
  }

  /** @private */
  removeTaskOption(task) {
    return {
      name: 'Remove',
      onClickFunction: () => this.openRemoveModal(task)
    }
  }

  render() {
    const tasks = this.state.tasks;
    return (
      <div>
        <List style={taskList.list}>
          {tasks.map((task, index) =>
            <ListItem
              key={index}
              primaryText={task.name}
              secondaryText={task.estimatedDuration}
              nestedItems={[<TaskDescription key={1} task={task} />]}
              leftAvatar={<Avatar
                size={35}
                icon={this.getCategoryAvatarData(task.category).icon}
                backgroundColor={this.getCategoryAvatarData(task.category).backgroundColor}
                style={taskList.avatar}
              />}
            >
              <MoreOptionsButton options={[
                this.editTaskOption(task),
                this.removeTaskOption(task)
              ]} />
              <IconButton tooltip='Check!' style={taskList.iconButton}><Done /></IconButton>
              <IconButton tooltip='Start!' style={taskList.iconButton}><PlayArrow /></IconButton>
            </ListItem>
          )}
        </List>
        <EditTaskModal />
        <RemoveTaskModal />
      </div>
    );
  }
}

export default TaskList;
