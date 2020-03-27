import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decreaseTimer, storeTimeID } from '../actions/TimerActions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTimer: '',
    };
  }

  componentDidMount() {
    const { startTimer } = this.props;
    this.setState({ setTimer: setInterval(() => startTimer(), 1000) });
  }

  shouldComponentUpdate(prevState) {
    if (prevState !== this.state) return true;
    return false;
  }

  componentDidUpdate(prevState) {
    const { timer, stopTimer, timerIsRunning } = this.props;
    const { setTimer } = this.state;
    if (timer !== 0 && stopTimer === true && timerIsRunning === true) {
      console.log("clear Interval");

      clearInterval(setTimer);
    }
  }

  render() {
    const { timer } = this.props;
    return (
      <div data-testid="timer">
        {`Tempo: ${timer}`}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startTimer: () => dispatch(decreaseTimer()),
});

const mapStateToProps = ({
  timeReducer: { timer, stopTimer, timerIsRunning, timeID },
}) => ({
  timer, stopTimer, timerIsRunning, timeID,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  timerIsRunning: PropTypes.bool.isRequired,
  stopTimer: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
};
