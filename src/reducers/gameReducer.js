export const INITIAL_STATE = {
  name: '',
  email: '',
  timer: 6,
  scoreboard: 0,
  lastQuestionStatus: 'correct',
};
const SENDEMAIL = 'SEND_EMAIL';
const SENDNAME = 'SEND_NAME';
const WRONG_ASNWER = 'WRONG_ANSWER';
const MINUS_ONE_SECOND = 'MINUS_ONE_SECOND';
const RESET_TIMER = 'RESET_TIMER';
const WRONG_ANSWER = 'WRONG_ANSWER';

export default function nameAndEmail(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SENDEMAIL:
      return { ...state, email: action.email };
    case SENDNAME:
      return { ...state, name: action.name };
    case WRONG_ASNWER:
      return { ...state, scoreboard: 0 };
    case MINUS_ONE_SECOND:
      if (state.timer !== 0) return { ...state, timer: state.timer - 1 };
      return { ...state, timer: 0 };
    case RESET_TIMER:
      return { ...state, timer: 30 };
    case WRONG_ANSWER:
      return { ...state, lastQuestionStatus: 'wrong' };
    default:
      return state;
  }
}
