import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { minusOneSecond } from '../actions/TimerActions';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setTimer: {},
    };

    this.setTimerOn = this.setTimerOn.bind(this);
  }

  componentDidMount() {
    this.setTimerOn();
  }


  componentDidUpdate() {
    const { timer } = this.props;
    const { setTimer } = this.state;
    if (timer === 0) clearInterval(setTimer);
  }

  setTimerOn() {
    const { startTimerCountdown } = this.props;
    const setTimer = setInterval(startTimerCountdown, 1000);
    this.setState({ setTimer });
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        {timer}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startTimerCountdown: () => dispatch(minusOneSecond()),
});

const mapStateToProps = ({ gameReducer: { timer } }) => ({
  timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  startTimerCountdown: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};
