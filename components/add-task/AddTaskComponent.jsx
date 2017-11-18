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
      startDate: undefined,
      endDate: undefined
     };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  setDate(startDate, endDate) {
    this.setState({ startDate, endDate });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
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
        onClick={this.handleClose}
      />,
    ];

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
            // errorText='This field is required'
          />
          <CategoryPicker />
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
                value={moment().format('YYYY-MM-DD')}
                floatingLabelText="Start date"
                disabled
              />
              <TextField
                style={{ width: '150px' }}
                value={moment().format('YYYY-MM-DD')}
                floatingLabelText="End date"
                disabled
              />
            </div>
          </div>
          <TimeInput />
          <TextField
            fullWidth
            hintText={'Add a Description'}
            floatingLabelText='Description (Optional)'
            floatingLabelFixed
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
          <DatePicker onChange={this.setDate} />
        </Dialog>
      </div>
    );
  }
}

export default AddTaskComponent;
