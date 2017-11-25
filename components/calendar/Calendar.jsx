import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NvUp from 'material-ui/svg-icons/navigation/expand-less';
import NvDown from 'material-ui/svg-icons/navigation/expand-more';

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
      snackbarMessage: '',
      open: true,
    };
    this.setDate = this.setDate.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.handleCalendarPane = this.handleCalendarPane.bind(this);
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

  handleCalendarPane() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { startDate, endDate } = this.state;
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{ marginLeft: '15px' }} text="Calendar" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <FloatingActionButton
              mini
              style={{ marginRight: 25 }}
               onClick={() => this.handleCalendarPane()}
            >
              {
                this.state.open ?
                <NvDown /> :
                <NvUp />
              }
            </FloatingActionButton>
          </ToolbarGroup>
        </Toolbar>
        {
          this.state.open &&
          <DatePicker
            startDate={this.state.startDate} // TODO: this.location.state.goBackStrtDate
            endDate={this.state.endDate}
            onChange={this.setDate}
          />
        }
        <p />
        <Today
          title="Scheduled Tasks"
          height={this.state.open ? 150 : 500}
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
