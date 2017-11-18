import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class TimeInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: '00:00',
      emitWarning: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    if (value.indexOf(':') > -1 && value.split(':').length === 2) {
      const hours = value.split(':')[0];
      const minutes = value.split(':')[1];
      if (!isNaN(hours) && !isNaN(minutes)) {
        this.setState({ currentValue: value });
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

export default TimeInput;
