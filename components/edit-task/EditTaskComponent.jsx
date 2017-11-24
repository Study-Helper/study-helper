import React from 'react';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import GoBack from 'material-ui/svg-icons/navigation/chevron-left';
import CalendarIcon from 'material-ui/svg-icons/action/today';
import Clear from 'material-ui/svg-icons/content/delete-sweep';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Toggle from 'material-ui/Toggle';

import { appbar, addTask } from '../../styles/styles.css.js';

import DatePicker from '../calendar/DatePicker.jsx';
import CategoryPicker from '../add-task/category/CategoryPicker.jsx';
import TimeInput from '../add-task/TimeInput.jsx';
import TaskManager from '../../server/managers/TaskManager.js';
import CategoryManager from '../../server/managers/CategoryManager.jsx';

const UNDO_TIME_MS = 3000

class EditTaskComponent extends React.Component {

  constructor(props) {
    super(props);
    const { task } = this.props.location.state;
    this.state = {
      open: false,
      title: task.name,
      startDate: task.startDate,
      endDate: task.endDate,
      estimatedTime: task.estimatedDuration,
      description: task.description || '',
      category: CategoryManager.loadCategoryByName(task.category),
      searchText: undefined,
      requiredFieldsFilled: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.confirmEditTask = this.confirmEditTask.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  setTitle(event) {
    this.setState({ title: event.target.value });
  }

  setDate(startDate, endDate) {
    this.setState({ nstartDate: startDate, nendDate: endDate });
  }

  setCategory(category) {
    this.setState({ category: category.title });
  }

  setTime(estimatedTime) {
    this.setState({ estimatedTime });
  }

  setDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleConfirm() {
    this.setState({
      startDate: this.state.nstartDate,
      endDate: this.state.nendDate,
      open: false,
    });
  }

  resetFields() {
    this.setState({
      title: '',
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      estimatedTime: undefined,
      description: '',
      searchText: undefined,
      category: undefined,
      requiredFieldsFilled: false
    });
  }

  confirmEditTask() {
    const { task, taskLocation } = this.props.location.state;
    const { title, description, startDate, endDate, estimatedTime, category } = this.state;

    TaskManager.updateName(task, title, taskLocation);
    TaskManager.updateDescription(task, description, taskLocation);
    TaskManager.updateCategory(task, category, taskLocation);
    TaskManager.updateEstimatedDuration(task, estimatedTime, taskLocation);
    TaskManager.updateStartAndEndDates(task, startDate, endDate, taskLocation);

    this.props.history.goBack();
  }

  render() {
    const goBack = this.props.history.goBack;
    const actions = [
      <FlatButton
        secondary
        label="Cancel"
        onClick={this.handleClose}
      />,
      <FlatButton
        primary
        label="Submit"
        onClick={this.handleConfirm}
      />,
    ];

    const { startDate, endDate, estimatedTime } = this.state;

    const style = {
      marginLeft: 40,
      marginRight: 20,
    };

    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <IconButton onClick={goBack} tooltip='Back'><GoBack /></IconButton>
            <ToolbarTitle style={{ marginLeft: '15px' }} text='Edit Task' />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton
              style={{ margin: '0px 25px 0px 20px' }}
              primary
              onClick={() => this.resetFields()}
              label='Clear Fields'
              icon={<Clear />}
            />
          </ToolbarGroup>
        </Toolbar>
        <div style={addTask.window}>
          <TextField
            ref={textField => { this.taskTitleField = textField; }}
            value={this.state.title}
            fullWidth
            hintText={'Title'}
            floatingLabelText='Task Title'
            onChange={this.setTitle}
          />
          <CategoryPicker
            onChange={this.setCategory}
            category={this.state.category}
            filter={this.state.searchText}
            createBtn
          />
          <TimeInput onChange={this.setTime} time={estimatedTime} />
          <FloatingActionButton mini style={style} onClick={() => this.handleOpen()}>
            <CalendarIcon />
          </FloatingActionButton>
            <TextField
              style={{ width: 125, marginRight: '20px' }}
              value={startDate}
              floatingLabelText="Start date"
              onClick={() => this.handleOpen()}
            />
            <TextField
              style={{ width: 125 }}
              value={endDate}
              floatingLabelText="End date"
              onClick={() => this.handleOpen()}
            />
          <TextField
            fullWidth
            hintText={'Add a Description'}
            floatingLabelText='Description (Optional)'
            floatingLabelFixed
            value={this.state.description}
            onChange={this.setDescription}
          />
          <Toggle
            label="Mark this task as a priority one"
            labelPosition="right"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
          <RaisedButton
            label='Confirm'
            onClick={() => this.confirmEditTask()}
            disabled={this.state.requiredFieldsFilled}  // TODO
            style={addTask.button}
            primary
          />
          <RaisedButton
            label='Cancel'
            onClick={goBack}
            style={addTask.button}
            secondary
          />
        </div>
        <Dialog
          title="Choose a date"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <DatePicker startDate={startDate} endDate={endDate} onChange={this.setDate} />
        </Dialog>
      </div>
    );
  }
}

export default EditTaskComponent;
