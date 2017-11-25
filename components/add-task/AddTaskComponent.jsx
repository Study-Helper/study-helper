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
import CategoryPicker from './category/CategoryPicker.jsx';
import TimeInput from './TimeInput.jsx';
import TaskManager from '../../server/managers/TaskManager.js';

class AddTaskComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      startDate: this.props.location.state.startDate,
      endDate: this.props.location.state.endDate,
      estimatedTime: '00:01',
      description: '',
      searchText: undefined,
      category: undefined,
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
    this.confirmAddTask = this.confirmAddTask.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.goBackWithState = this.goBackWithState.bind(this);
  }

  componentDidMount() {
    this.taskTitleField.focus();
  }

  setTitle(event) {
    const { startDate, endDate, category } = this.state;
    // Check if the confirm button can be enabled.
    const filled = startDate && endDate && category && event.target.value;
    this.setState({ title: event.target.value, requiredFieldsFilled: filled });
  }

  setDate(startDate, endDate) {
    const { title, category } = this.state;
    // Check if the confirm button can be enabled.
    const filled = startDate && endDate && category && title;
    this.setState({ nstartDate: startDate, nendDate: endDate, requiredFieldsFilled: filled });
  }

  setCategory(category) {
    const { title, startDate, endDate } = this.state;
    // Check if the confirm button can be enabled.
    const filled = startDate && endDate && category && title;
    this.setState({ category, requiredFieldsFilled: filled });
  }

  setTime(estimatedTime) {
    const { title, startDate, endDate, category } = this.state;
    // Check if the confirm button can be enabled.
    const filled = startDate && endDate && category && title && estimatedTime;
    this.setState({ estimatedTime });
  }

  setDescription(event) {
    const { title, startDate, endDate, category } = this.state;
    // Check if the confirm button can be enabled.
    const filled = startDate && endDate && category && title;
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

  confirmAddTask(reset) {
    const { backPath } = this.props.location.state;
    const { title, description, startDate, endDate, estimatedTime, category } = this.state;
    
    const taskToAdd = {
      name: title,
      description: description || 'No description available.',
      estimatedDuration: estimatedTime || '00:01',
      category: category.title,
      startDate: startDate,
      endDate: endDate
    };
    TaskManager.add(taskToAdd, 'todo_tasks');

    if (reset) {
      this.resetFields();
    } else {
      this.props.history.push({
        pathname: backPath,
        state: { from: 'task-added', task: taskToAdd }
      });
    }
  }

  goBackWithState() {
    const { backPath } = this.props.location.state;
    // A "Task" to match the EditTaskComponent... Don't ask.
    const fakeTask = {
      startDate: this.props.location.state.startDate,
      endDate: this.props.location.state.endDate
    }
    this.props.history.push({
      pathname: backPath,
      state: { noRender: true, from: 'task-added', task: fakeTask }
    });
  }

  render() {
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

    const { startDate, endDate, estimatedTime, requiredFieldsFilled } = this.state;

    const style = {
      marginLeft: 40,
      marginRight: 20,
    };

    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <IconButton onClick={this.goBackWithState} tooltip='Back'><GoBack /></IconButton>
            <ToolbarTitle style={{ marginLeft: '15px' }} text='Add Task' />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton
              primary
              style={{ margin: '0px 30px 0px 20px' }}
              labelPosition='before'
              onClick={() => this.resetFields()}
              label='Clear fields'
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
            floatingLabelText='*Task Title'
            onChange={this.setTitle}
          />
          <CategoryPicker
            onChange={this.setCategory}
            category={this.state.category}
            filter={this.state.searchText}
            createBtn
          />
          <TimeInput onChange={this.setTime} time={estimatedTime} />
          <FloatingActionButton mini zDepth={1} style={style} onClick={() => this.handleOpen()}>
            <CalendarIcon />
          </FloatingActionButton>
            <TextField
              style={{ width: 125, marginRight: '20px' }}
              value={startDate}
              floatingLabelText="*Start Date"
              onClick={() => this.handleOpen()}
            />
            <TextField
              style={{ width: 125 }}
              value={endDate}
              floatingLabelText="*End Date"
              onClick={() => this.handleOpen()}
            />
          <TextField
            fullWidth
            hintText={'Add a Description'}
            floatingLabelText='Description'
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
            label='Add'
            onClick={() => this.confirmAddTask(false)}
            disabled={!requiredFieldsFilled}
            style={{float: 'right', marginTop: '5px', marginRight: '-6px'}}
            primary
          />
          {/*<RaisedButton
            label='Add more'
            onClick={() => this.confirmAddTask(true)}
            disabled={!requiredFieldsFilled}
            style={addTask.button}
            primary
          />*/}
          <FlatButton
            label='Cancel'
            onClick={this.goBackWithState}
            style={{float: 'right', marginTop: '5px', marginRight: '5px'}}
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

export default AddTaskComponent;
