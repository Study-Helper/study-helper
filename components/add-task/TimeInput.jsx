import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class TimeInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: this.props.time || '00:00',
      emitWarning: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.time) {
      this.setState({ currentValue: '00:00' });
    }
  }

  handleChange(event) {
    const { value } = event.target;
    if (value.indexOf(':') > -1 && value.split(':').length === 2) {
      const hours = value.split(':')[0];
      const minutes = value.split(':')[1];
      if (!isNaN(hours) && !isNaN(minutes) && minutes <= 59) {
        console.log('minutes[0]', minutes[0]);
        console.log('>2', minutes.length > 2);
        if (minutes[0] === '0' && minutes.length > 2) {
          return;
        }
        this.setState({ currentValue: value });
        this.props.onChange(value);
      }
    }
  }

  render() {
    return (
      <TextField
        hintText="00:00"
        floatingLabelText="Task duration (Hours:Minutes)"
        value={this.state.currentValue}
        onChange={this.handleChange}
      />
    );
  }

}

TimeInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  estimatedTime: PropTypes.string,
};

export default TimeInput;
