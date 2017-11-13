import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      minutes: 0,
      hours: 0,
      intervalId: undefined,
      currentMessage: "You're doing very well",
      currentColor: '#00c3cb'
    };
    this.timer = this.timer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
   clearInterval(this.state.intervalId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paused && this.state.intervalId !== undefined) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: undefined });
    } else if (!nextProps.paused && this.state.intervalId === undefined) {
      this.setTimer();
    }
  }

  setTimer() {
    const intervalId = setInterval(this.timer, 1000);
     this.setState({ intervalId });
  }

  timer() {
    const { seconds, minutes, hours } = this.state;
    if (seconds === 59) {
      if (minutes === 59) {
        this.setState({ seconds: 0, minutes: 0, hours: hours + 1 });
      } else {
        this.setState({ seconds: 0, minutes: minutes + 1 });
      }
    } else {
      this.setState({ seconds: seconds + 1 });
    }
    this.handleFeedback();
  }

  handleFeedback() {
    if (this.state.seconds >= 10) {
      this.setState({ currentColor: '#8A0808', currentMessage: 'You failed miserably :(' });
    } else if (this.state.seconds >= 5) {
      this.setState({ currentColor: '#DBA901', currentMessage: 'Hurry up! Time is passing by...' });
    }
  }

  render() {
    const tstyle = { backgroundColor: this.state.currentColor };
    return (
      <div className="timer" style={tstyle}>
        <div className="timer-count">
            <div className="timer-count__hours timer-count__wrap">
                <span className="timer-count__hours-text timer-count__text">
                  {this.state.hours}
                </span>
                <span id="timer-hours" className="timer-count__label">Hours</span>
            </div>
            <div className="timer-count__minutes timer-count__wrap">
                <span className="timer-count__minutes-text timer-count__text">
                  {this.state.minutes}
                </span>
                <span id="timer-minutes" className="timer-count__label">Minutes</span>
            </div>
            <div className="timer-count__seconds timer-count__wrap">
                <span className="timer-count__seconds-text timer-count__text">
                  {this.state.seconds}
                </span>
                <span id="timer-seconds" className="timer-count__label">Seconds</span>
            </div>
        </div>
        <div className="timer-status__label">
          {this.state.currentMessage}
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  paused: PropTypes.bool.isRequired,
};

export default Timer;
