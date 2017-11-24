import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import DatePicker from './DatePicker.jsx';
import Today from '../home/Today.jsx';
import { appbar } from '../../styles/styles.css.js';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: undefined,
      endDate: undefined,
      shouldRenderSnackbar: false,
      snackbarMessage: ''
    };
    this.setDate = this.setDate.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.task) {
      this.setState({
        startDate: this.props.location.state.task.startDate,
        endDate: this.props.location.state.task.endDate
      });
    }
  }

  setDate(startDate, endDate) {
    this.setState({ startDate, endDate });
  }

  closeSnackbar() {
    this.setState({ shouldRenderSnackbar: false });
  }

  render() {
    const { startDate, endDate } = this.state;
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{ marginLeft: '15px' }} text="Calendar" />
          </ToolbarGroup>
        </Toolbar>
        <DatePicker
          startDate={this.state.startDate} // TODO: this.location.state.goBackStrtDate
          endDate={this.state.endDate}
          onChange={this.setDate}
        />
        <p />
        <Today 
          title="Scheduled Tasks"
          height={150}
          range={[startDate, endDate]}
          withFilter={false}
          calendarProps={this.props}
          calendarStartDate={this.state.startDate}
          calendarEndDate={this.state.endDate}
        />
      </div>
    );
  }
}

export default Calendar;
