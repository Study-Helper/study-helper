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
      currentMessage: "You're doing well! Keep going!",
      currentColor: '#00c3cb'
    };
    this.timer = this.timer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
  }

  componentDidMount() {
    const durationArr = this.props.estimatedDuration.split(':');
    const hours = durationArr[0];
    const minutes = durationArr[1];
    const totalEstimatedSeconds = (minutes * 60) + (hours * 3600);
    const limitSeconds = totalEstimatedSeconds * 0.60;
    this.setState({ totalEstimatedSeconds, limitSeconds });
    this.setTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paused && this.state.intervalId !== undefined) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: undefined });
    } else if (!nextProps.paused && this.state.intervalId === undefined) {
      this.setTimer();
    }
  }

  componentWillUnmount() {
   clearInterval(this.state.intervalId);
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
    const totalSeconds = this.state.seconds + (this.state.minutes * 60) + (this.state.hours * 3600);
    if (totalSeconds >= this.state.totalEstimatedSeconds) {
      this.setState({ currentColor: '#8A0808', currentMessage: "Time is over! Maybe you should re-estimate your task duration."});
    } else if (totalSeconds >= this.state.limitSeconds) {
      this.setState({ currentColor: '#DBA901', currentMessage: 'Hurry up! Time is passing by!' });
    }
  }

  render() {
    const tstyle = { backgroundColor: this.state.currentColor };
    return (
      <div className="timer" style={tstyle}>
        <div style={{'marginTop':'10px'}}>
          <div className="timer-status__label" style={{'marginBottom':'30px'}}>
            Time Elapsed:
          </div>
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
          <div className="timer-status__label" style={{'marginTop':'20px', 'padding':'10px'}}>
            {this.state.currentMessage}
          </div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  paused: PropTypes.bool.isRequired,
  estimatedDuration: PropTypes.string.isRequired,
};

export default Timer;
