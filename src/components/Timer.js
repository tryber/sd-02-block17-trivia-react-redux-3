import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decreaseTimer } from '../actions/TimerActions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInterval: '',
    };
  }

  componentDidMount() {
    const { stopTimer, toDecreaseTimer } = this.props;
    return stopTimer === false
      && this.setState({ timeInterval: setInterval(() => toDecreaseTimer(), 1000) })
  }

  componentDidUpdate() {
    const { timer, stopTimer } = this.props;
    const { timeInterval } = this.state;
    return (timer === 0 || stopTimer === true) && clearInterval(timeInterval);
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
  toDecreaseTimer: () => dispatch(decreaseTimer()),
});

const mapStateToProps = ({
  timeReducer: { timer, stopTimer },
}) => ({
  timer, stopTimer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  stopTimer: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  toDecreaseTimer: PropTypes.func.isRequired,
};
