import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PlayArrow from 'material-ui/svg-icons/AV/play-arrow';
import Done from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import TaskDescription from './TaskDescription.jsx';
import MoreOptionsButton from '../more-options/MoreOptionsButton.jsx';
import EditIcon from 'material-ui/svg-icons/content/create';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { taskList } from '../../styles/styles.css.js';
import categories from '../../server/categories.jsx';

/* Import these to call their static#openSelf. */
import EditTaskModal from '../modals/EditTaskModal.jsx';
import RemoveTaskModal from '../modals/RemoveTaskModal.jsx';

class TaskList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tasks: props.tasks }
    this.subscribeToTaskUpdatedEvents = this.subscribeToTaskUpdatedEvents.bind(this);
    this.subscribeToTaskRemovedEvents = this.subscribeToTaskRemovedEvents.bind(this);
    this.subscribeToTaskAddedEvents = this.subscribeToTaskAddedEvents.bind(this);
  }

  componentWillMount() {
    this.subscribeToTaskUpdatedEvents();
    this.subscribeToTaskRemovedEvents();
    this.subscribeToTaskAddedEvents(); 
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.taskUpdatedToken);
    PubSub.unsubscribe(this.taskAddedToken);
    PubSub.unsubscribe(this.taskRemovedToken);
  }

  /** @private */
  subscribeToTaskUpdatedEvents() {
    this.taskUpdatedToken = PubSub.subscribe(
      'Task Updated',
      (message, updatedTask) => this.setState((prevState, props) => {
        const tasks = prevState.tasks;
        const localIndex = tasks.findIndex(i => i.id === updatedTask.id);
        tasks[localIndex] = updatedTask;
        return { tasks: tasks }
      })
    );
  }

  /** @private */
  subscribeToTaskAddedEvents() {
     this.taskAddedToken = PubSub.subscribe(
      'Task Added',
      (message, addedTask) => this.setState((prevState, props) => {
        const tasks = prevState.tasks;
        // Remember we passed an extra field, "indexInTheList".
        // If we're adding from an UNDO, use that same index.
        // Otherwise, add it to the end.
        const indexToInsert = addedTask.indexInTheList !== undefined
          ? addedTask.indexInTheList
          : tasks.length;
        tasks.splice(indexToInsert, 0, addedTask);
        return { tasks: tasks }
      })
    );
  }

  /** @private */
  subscribeToTaskRemovedEvents() {
    this.taskRemovedToken = PubSub.subscribe(
      'Task Removed',
      (message, removedTask) => this.setState((prevState, props) => {
        const tasks = prevState.tasks;
        const localIndex = tasks.findIndex(i => i.id === removedTask.id);
        tasks.splice(localIndex, 1);
        return { tasks: tasks }
      })
    );
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
    const indexInTheList = this.state.tasks.findIndex(i => i.id === task.id);
    task.indexInTheList = indexInTheList;
    RemoveTaskModal.openSelf(task);
  }

  /** @private */
  editTaskOption(task) {
    return {
      name: 'Edit',
      icon: <EditIcon />,
      onClickFunction: () => this.openEditModal(task)
    }
  }

  /** @private */
  removeTaskOption(task) {
    return {
      name: 'Remove',
      icon: <DeleteIcon />,
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
