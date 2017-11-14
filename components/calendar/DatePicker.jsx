import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleStartSelect = this.handleStartSelect.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleStartSelect(date) {
    const currDate = date.startDate.format('YYYY-MM-DD').toString();
    this.props.onChange(currDate, currDate);
	}

  handleChangeSelect(date) {
    this.props.onChange(date.startDate.format('YYYY-MM-DD').toString(), date.endDate.format('YYYY-MM-DD').toString());
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <DateRange
					onInit={this.handleStartSelect}
					onChange={this.handleChangeSelect}
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
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
