import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Rescue from 'material-ui/svg-icons/av/loop';
import IconButton from 'material-ui/IconButton';
import TaskDescription from './TaskDescription.jsx';
import MoreOptionsButton from '../more-options/MoreOptionsButton.jsx';
import EditIcon from 'material-ui/svg-icons/content/create';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { taskList } from '../../styles/styles.css.js';

/* Import these to call their static#openSelf. */
import EditTaskModal from '../modals/EditTaskModal.jsx';
import RemoveTaskModal from '../modals/RemoveTaskModal.jsx';
import TaskManager from '../../server/managers/TaskManager.js';
import CategoryManager from '../../server/managers/CategoryManager.jsx';

/**
 * Very similar to the RegularTaskList, but the events will change so much
 * that it's not worth keeping it all in a single component with a shitload
 * of condition checks...
 */
class HistoryTaskList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      deleted: {
        tasks: props.deletedTasks,
        subheaderText: 'Deleted Tasks'
      },
      completed: {
        tasks: props.completedTasks,
        subheaderText: 'Completed Tasks'
      }
    }
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
        return { tasks }
      })
    );
  }

  /** @private */
  subscribeToTaskAddedEvents() {
     this.taskAddedToken = PubSub.subscribe(
      'Task Added',
      (message, data) => this.setState((prevState, props) => {
        const tasks = prevState.tasks;
        // NOTE: data = { task, indexInTheList || undefined }
        const task = data.addedTask;
        const index = data.indexInTheList;
        // Iff we're coming from and undo, indexInTheList is not undefined.
        // Otherwise, add it to the end.
        const indexToInsert = index !== undefined ? index : tasks.length;
        tasks.splice(indexToInsert, 0, task);
        return { tasks }
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
        return { tasks }
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
    RemoveTaskModal.openSelf(task, indexInTheList);
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

  // TODO: Collapsable subheader?
  render() {
    const tasks = this.state.tasks;
    const { completed, deleted } = this.state;
    // Put them into an array to use map.
    const dataArray = [completed, deleted];
    return (
      <div>
        <List style={taskList.list}>
          {dataArray.map((data, index) =>
            <div>
              <Subheader style={{fontFamily: 'Roboto'}}>{data.subheaderText}</Subheader>
              {data.tasks.map((task, index) =>
                <div key={index}>
                  <ListItem
                    key={index}
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
                    <MoreOptionsButton options={[
                      this.editTaskOption(task),
                      this.removeTaskOption(task)
                    ]} />
                    <IconButton tooltip='Start!' style={taskList.iconButton}>
                      <Rescue />
                    </IconButton>
                  </ListItem>
                  {index < data.tasks.length - 1 && 
                    <Divider style={{backgroundColor: '#EEEEEE', width: '650px', marginLeft: '20px'}} />}
                </div>
              )}
            </div>
          )}
        </List>
        <EditTaskModal />
        <RemoveTaskModal />
      </div>
    );
  }
}

export default HistoryTaskList;
