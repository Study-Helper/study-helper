import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PlayArrow from 'material-ui/svg-icons/AV/play-arrow';
import Done from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import SubjectDescription from './SubjectDescription.jsx';
import MoreOptionsButton from '../more-options/MoreOptionsButton.jsx';
import EditIcon from 'material-ui/svg-icons/content/create';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import CheckButton from './CheckButton.jsx';
import Divider from 'material-ui/Divider';
import { taskList } from '../../styles/styles.css.js';

/* Import these to call their static#openSelf. */
import EditTaskModal from '../modals/task-modals/EditTaskModal.jsx';
import RemoveTaskModal from '../modals/task-modals/RemoveTaskModal.jsx';
import SubjectManager from '../../server/managers/SubjectManager.js';

import SubjectIconsManager from '../../server/managers/SubjectIconsManager.jsx';

class SubjectsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { subjects: props.subjects }
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
        const tasks = prevState.tasks;
        const localIndex = tasks.findIndex(i => i.id === data.editedTask.id);
        tasks[localIndex] = data.editedTask;
        return { tasks }
      })
    );
  }

  /** @private */
  subscribeToTaskAddedEvents() {
     this.taskAddedToken = PubSub.subscribe(
      'Regular - Task Added',
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
      'Regular - Task Removed',
      (message, data) => this.setState((prevState, props) => {
        const tasks = prevState.tasks;
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

  /** @private */
  getDescription(subject){
    const listItems = [];
    const subjectTests = SubjectManager.getAllTests(subject);
    let index = 0;
    //listItems.push(<Divider style={{backgroundColor: '#EEEEEE', width: '600px', marginLeft: '40px'}} />);
    for(let key in subjectTests){
      let test = subjectTests[key];
      let description = test.name + ": " + test.grade;
      listItems.push(<SubjectDescription description={description}/>);
      if(index < subjectTests.length-1){
        //listItems.push(<Divider style={{backgroundColor: '#EEEEEE', width: '600px', marginLeft: '40px'}} />);
      }
      index++;
    }
    return listItems;
  }

  render() {
    const subjects = this.state.subjects;
    return (
      <div>
        <List style={taskList.list}>
          {subjects.map((subject, index) =>
            <div key={index}>
              <ListItem
                key={index}
                primaryText={subject.name}
                secondaryText={"Average: " + subject.mean}
                nestedItems={this.getDescription(subject)}
                leftAvatar={<Avatar
                  size={35}
                  icon={SubjectIconsManager.getSubjectIconFromString(subject.image)}
                  backgroundColor={SubjectIconsManager.getSubjectBackgroundColorFromString(subject.image)}
                  style={taskList.avatar}
                />}>
                
              </ListItem>
              {index < subjects.length - 1 && 
                <Divider style={{backgroundColor: '#EEEEEE', width: '650px', marginLeft: '20px'}} />}
            </div>
          )}
        </List>
      </div>
    );
  }
}

export default SubjectsList;
