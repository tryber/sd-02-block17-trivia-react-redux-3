import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decreaseTimer } from '../actions/TimerActions';

class Timer extends Component {
  constructor(props) {
    super(props);
    const { toDecreaseTimer } = this.props;
    this.state = {
      timeInterval: setInterval(() => toDecreaseTimer(), 1000),
    };
  }

  componentDidUpdate() {
    const { timer } = this.props;
    const { timeInterval } = this.state;
    if (timer === 0) clearInterval(timeInterval);
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
  timeReducer: { timer },
}) => ({
  timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  toDecreaseTimer: PropTypes.func.isRequired,
};
