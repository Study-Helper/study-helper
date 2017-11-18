import React from 'react';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import GoBack from 'material-ui/svg-icons/navigation/chevron-left';
import CalendarIcon from 'material-ui/svg-icons/action/date-range';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import { appbar, addTask } from '../../styles/styles.css.js';

import DatePicker from '../calendar/DatePicker.jsx';
import CategoryPicker from './category/CategoryPicker.jsx';
import TimeInput from './TimeInput.jsx';

class AddTaskComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: undefined,
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      estimatedTime: undefined,
      description: undefined,
     };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  setTitle(event) {
    this.setState({ title: event.target.value });
  }

  setDate(startDate, endDate) {
    this.setState({ nstartDate: startDate, nendDate: endDate });
  }

  setCategory(category) {
    this.setState({ category });
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

  render() {
    const goBack = this.props.history.goBack;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={this.handleConfirm}
      />,
    ];

    const { startDate, endDate } = this.state;

    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <IconButton onClick={goBack} tooltip='Back'><GoBack /></IconButton>
            <ToolbarTitle style={{ marginLeft: '15px' }} text='Add Task' />
          </ToolbarGroup>
        </Toolbar>
        <div style={addTask.window}>
          <TextField
            fullWidth
            hintText={'Title'}
            floatingLabelText='Task Title'
            onChange={this.setTitle}
            // errorText='This field is required'
          />
          <CategoryPicker onChange={this.setCategory} />
          <div>
            <RaisedButton
              label="Click to change date"
              style={{ width: '300px', marginTop: '27px' }}
              icon={<CalendarIcon />}
              onClick={() => this.handleOpen()}
            />
            <div style={{ float: 'right' }}>
              <TextField
                style={{ width: '150px', marginRight: '20px' }}
                value={startDate}
                floatingLabelText="Start date"
                onClick={() => this.handleOpen()}
              />
              <TextField
                style={{ width: '150px' }}
                value={endDate}
                floatingLabelText="End date"
                onClick={() => this.handleOpen()}
              />
            </div>
          </div>
          <TimeInput onChange={this.setTime} />
          <TextField
            fullWidth
            hintText={'Add a Description'}
            floatingLabelText='Description (Optional)'
            floatingLabelFixed
            onChange={this.setDescription}
          />
          <RaisedButton
            label='Confirm'
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

export default AddTaskComponent;
