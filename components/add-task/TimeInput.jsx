import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class TimeInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: this.props.time || '00:00',
      emitWarning: false,
      errorText: '',
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
      if (!isNaN(hours) && !isNaN(minutes)) {
        if (minutes <= 59) {
          if (minutes[0] === '0' && minutes.length > 2) {
            this.setState({
              currentValue: value,
              emitWarning: true,
               errorText: 'Invalid minutes!'
             });
            return;
          }
          this.setState({
            currentValue: value,
            emitWarning: false
          });
          this.props.onChange(value);
        } else {
          this.setState({
            currentValue: value,
            emitWarning: true,
            errorText: 'Invalid minutes!'
           });
        }
      } else {
        this.setState({
          currentValue: value,
          emitWarning: true,
          errorText: 'Invalid time! Valid example: 11:59'
        });
      }
    }
  }

  render() {
    const element = this.state.emitWarning ?
    (<TextField
      hintText="00:00"
      floatingLabelText="Task duration (Hours:Minutes)"
      value={this.state.currentValue}
      onChange={this.handleChange}
      errorText={this.state.errorText}
    />) :
    (<TextField
      hintText="00:00"
      floatingLabelText="Task duration (Hours:Minutes)"
      value={this.state.currentValue}
      onChange={this.handleChange}
    />);
    return element;
  }
}

TimeInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  estimatedTime: PropTypes.string,
};

export default TimeInput;
