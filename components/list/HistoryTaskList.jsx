import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import TaskDescription from './TaskDescription.jsx';
import MoreOptionsButton from '../more-options/MoreOptionsButton.jsx';
import EditIcon from 'material-ui/svg-icons/content/create';
import RescueButton from './RescueButton.jsx';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline';
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
        subheaderText: 'Deleted Tasks',
        source: 'deleted_tasks'
      },
      completed: {
        tasks: props.completedTasks,
        subheaderText: 'Completed Tasks',
        source: 'completed_tasks'
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
      (message, data) => this.setState((prevState, props) => {
        const tasks = data.editedTaskLocation === 'deleted_tasks' 
          ? this.state.deleted.tasks
          : this.state.completed.tasks;
        const editedTask = data.editedTask;
        const localIndex = tasks.findIndex(i => i.id === editedTask.id);
        tasks[localIndex] = editedTask;
        return { tasks }
      })
    );
  }

  /** @private */
  subscribeToTaskAddedEvents() {
     this.taskAddedToken = PubSub.subscribe(
      'History - Task Added',
      (message, data) => this.setState((prevState, props) => {
        const tasks = data.addedTaskLocation === 'deleted_tasks' 
          ? this.state.deleted.tasks
          : this.state.completed.tasks;
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
      'History - Task Removed',
      (message, data) => this.setState((prevState, props) => {
        const tasks = data.removedTaskLocation === 'deleted_tasks' 
          ? this.state.deleted.tasks
          : this.state.completed.tasks;
        const localIndex = tasks.findIndex(i => i.id === data.removedTask.id);
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
  openEditModal(task, taskLocation) {
    EditTaskModal.openSelf(task, taskLocation);
  }

  /** @private */
  openRemoveModal(task, taskLocation) {
    const tasks = taskLocation === 'deleted_tasks' 
      ? this.state.deleted.tasks
      : this.state.completed.tasks;
    const indexInTheList = tasks.findIndex(i => i.id === task.id);
    RemoveTaskModal.openSelf(task, indexInTheList, taskLocation);
  }

  /** @private */
  editTaskOption(task, taskLocation) {
    return {
      name: 'Edit',
      icon: <EditIcon />,
      onClickFunction: () => this.openEditModal(task, taskLocation)
    }
  }

  /** @private */
  removeTaskOption(task, taskLocation) {
    return {
      name: 'Clear',
      icon: <ClearIcon />,
      onClickFunction: () => this.openRemoveModal(task, taskLocation)
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
            <div key={index}>
              <ListItem
                disabled
                primaryText={data.subheaderText}
                secondaryText={`${data.tasks.length} items`}
                style={{color: '#757575', fontFamily: 'Roboto', backgroundColor: '#F5F5F5'}}
                initiallyOpen
                nestedListStyle={{marginTop: '-9px'}}
                nestedItems={
                  data.tasks.map((task, index) =>
                    <div key={index}>
                      <ListItem
                        key={index}
                        primaryText={task.name}
                        secondaryText={TaskManager.prettifyEstimatedDuration(task)}
                        nestedItems={[<TaskDescription key={1} task={task} />]}
                        leftAvatar={<Avatar
                          size={35}
                          icon={CategoryManager.getCategoryIconFromString(task.category)}
                          backgroundColor={CategoryManager.getCategoryBackgroundColorFromString(task.category)}
                          style={taskList.avatar}
                        />}
                      >
                        <MoreOptionsButton options={[
                          this.editTaskOption(task, data.source),
                          this.removeTaskOption(task, data.source)
                        ]} />
                        <RescueButton 
                          task={task}
                          taskLocation={data.source}
                          indexInTheList={data.tasks.findIndex(i => i.id === task.id)}
                        />
                      </ListItem>
                      {index < data.tasks.length - 1 && 
                        <Divider style={{backgroundColor: '#EEEEEE', width: '650px', marginLeft: '20px'}} />}
                    </div>
                  )}
              />
              {
                data.tasks.length === 0 &&
                  <div style={{ textAlign: 'center', fontFamily: 'Roboto', padding: '20px 0 20px 0' }}>
                    <div><ErrorIcon /></div>
                  <div>No tasks to show!</div>
                </div>
              }
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
