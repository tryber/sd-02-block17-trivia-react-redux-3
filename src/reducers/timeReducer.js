const INITIAL_STATE = {
  timer: 5,
};

const RESET_TIMER = 'RESET_TIMER';
const DECREASE_TIMER = 'DECREASE_TIMER';

export default function timeReducer(state = INITIAL_STATE, {
  type,
}) {
  switch (type) {
    case DECREASE_TIMER:
      if (state.timer !== 0) {
        return {
          ...state, timer: state.timer - 1,
        };
      } return { ...state, timer: 0 };
    case RESET_TIMER:
      return { ...state, timer: 30 };
    default:
      return state;
  }
}
