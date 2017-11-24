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
        <DatePicker onChange={this.setDate} />
        <p />
        <Today 
          title="Scheduled Tasks"
          height={150}
          range={[startDate, endDate]}
          withFilter={false}
          calendarProps={this.props}
        />
      </div>
    );
  }
}

export default Calendar;
