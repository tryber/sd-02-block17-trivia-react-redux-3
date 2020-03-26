import { RESET_TIMER, STOP_TIMER, DECREASE_TIMER } from '../actions/TimerActions';

const INITIAL_STATE = {
  timer: 10,
  stopTimer: false,
};

export default function timeReducer(state = INITIAL_STATE, {
  type,
}) {
  switch (type) {
    case DECREASE_TIMER:
      if (state.timer !== 0 && state.stopTimer === false) {
        return {
          ...state, timer: state.timer - 1,
        };
      } return { ...state };
    case RESET_TIMER:
      return { ...state, timer: 30 };
    case STOP_TIMER:
      return { ...state, stopTimer: true };
    default:
      return state;
  }
}
