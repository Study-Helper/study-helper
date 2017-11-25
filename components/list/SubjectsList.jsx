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
import AddTestButton from './AddTestButton.jsx';
import Divider from 'material-ui/Divider';
import { taskList } from '../../styles/styles.css.js';
import Add from 'material-ui/svg-icons/content/add';

import EditSubjectModal from '../modals/subject-modals/EditSubjectModal.jsx';
import RemoveSubjectModal from '../modals/subject-modals/RemoveSubjectModal.jsx';
import SubjectManager from '../../server/managers/SubjectManager.js';

import SubjectIconsManager from '../../server/managers/SubjectIconsManager.jsx';

class SubjectsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { subjects: props.subjects }
    this.subscribeToSubjectUpdatedEvents = this.subscribeToSubjectUpdatedEvents.bind(this);
    this.subscribeToSubjectRemovedEvents = this.subscribeToSubjectRemovedEvents.bind(this);
    this.subscribeToSubjectAddedEvents = this.subscribeToSubjectAddedEvents.bind(this);
  }

  componentWillMount() {
    this.subscribeToSubjectUpdatedEvents();
    this.subscribeToSubjectRemovedEvents();
    this.subscribeToSubjectAddedEvents();
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.subjectUpdatedToken);
    PubSub.unsubscribe(this.subjectAddedToken);
    PubSub.unsubscribe(this.subjectRemovedToken);
  }

  /** @private */
  subscribeToSubjectUpdatedEvents() {
    this.subjectUpdatedToken = PubSub.subscribe(
      'Subject Updated',
      (message, data) => this.setState((prevState, props) => {
        const subjects = prevState.subjects;
        const localIndex = subjects.findIndex(i => i.id === data.editedSubject.id);
        subjects[localIndex] = data.editedSubject;
        return { subjects }
      })
    );
  }

  /** @private */
  subscribeToSubjectAddedEvents() {
     this.subjectAddedToken = PubSub.subscribe(
      'Subject Added',
      (message, data) => this.setState((prevState, props) => {
        const subjects = prevState.subjects;
        // NOTE: data = { task, indexInTheList || undefined }
        const subject = data.addedSubject;
        const index = data.indexInTheList;
        // Iff we're coming from and undo, indexInTheList is not undefined.
        // Otherwise, add it to the end.
        const indexToInsert = index !== undefined ? index : subjects.length;
        subjects.splice(indexToInsert, 0, subject);
        return { subjects }
      })
    );
  }

  /** @private */
  subscribeToSubjectRemovedEvents() {
    this.subjectRemovedToken = PubSub.subscribe(
      'Subject Removed',
      (message, data) => this.setState((prevState, props) => {
        const subjects = prevState.subjects;
        const localIndex = subjects.findIndex(i => i.id === data.removedSubject.id);
        subjects.splice(localIndex, 1);
        return {subjects }
      })
    );
  }

  /** @private */
  getCategoryAvatarData(category) {
    return categories[category];
  }


  /** @private */
  openRemoveModal(subject) {
    const indexInTheList = this.state.subjects.findIndex(i => i.id === subject.id);
    RemoveSubjectModal.openSelf(subject, indexInTheList);
  }


  /** @private */
  openEditModal(subject) {
    EditSubjectModal.openSelf(subject);
  }


  /** @private */
  editSubjectOption(subject) {
    return {
      name: 'Edit',
      icon: <EditIcon />,
      onClickFunction: () => this.openEditModal(subject)
    }
  }

  /** @private */
  removeSubjectOption(subject) {
    return {
      name: 'Remove',
      icon: <DeleteIcon />,
      onClickFunction: () => this.openRemoveModal(subject)
    }
  }

  /** @private */
  getDescription(subject){
    const listItems = [];
    const subjectTests = SubjectManager.getAllTests(subject);
    if(subjectTests.length != 0){
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
    } else {
      listItems.push(<SubjectDescription description={'No tests available.'}/>);
    }
    
    return listItems;
  }

  openAddTestModal(subject){
    AddTestButton.openSelf(subject);
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
                leftAvatar={
                  <Avatar
                    size={35}
                    icon={SubjectIconsManager.getSubjectIconFromString(subject.image)}
                    backgroundColor={SubjectIconsManager.getSubjectBackgroundColorFromString(subject.image)}
                    style={taskList.avatar}
                  />
                }
              >
                <MoreOptionsButton options={[
                    this.editSubjectOption(subject),
                    this.removeSubjectOption(subject)
                ]}/>
                <IconButton
                  tooltip='Add Test!' 
                  style={taskList.iconButton}
                  onClick={()=>this.openAddTestModal(subject)}
                >
                  <Add />
                </IconButton>
              </ListItem>
              {index < subjects.length - 1 && 
                <Divider style={{backgroundColor: '#EEEEEE', width: '650px', marginLeft: '20px'}} />}
            </div>
          )}
        </List>
        <AddTestButton />
        <EditSubjectModal />
        <RemoveSubjectModal />
      </div>
    );
  }
}

export default SubjectsList;
