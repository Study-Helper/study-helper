import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleStartSelect = this.handleStartSelect.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleStartSelect(date) {
    const validRange = this.props.startDate && this.props.endDate;
    if (!validRange) {
      const currDate = date.startDate.format('YYYY-MM-DD').toString();
      this.props.onChange(currDate, currDate);
    }
	}

  handleChangeSelect(date) {
    this.props.onChange(date.startDate.format('YYYY-MM-DD').toString(), date.endDate.format('YYYY-MM-DD').toString());
  }

  render() {
    const { startDate, endDate } = this.props;
    const validRange = (startDate && endDate);
    return (
      <div style={{ textAlign: 'center' }}>
        <DateRange
					onInit={this.handleStartSelect}
					onChange={this.handleChangeSelect}
          startDate={validRange ? moment(startDate, 'YYYY-MM-DD') : undefined}
          endDate={validRange ? moment(endDate, 'YYYY-MM-DD') : undefined}
          linkedCalendars
          theme={{
            Calendar: {
              width: 303
            },
            DateRange: {
                fontFamily: 'Roboto',
              },
            }}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
