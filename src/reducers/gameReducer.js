export const INITIAL_STATE = {
  name: '',
  email: '',
  scoreboard: [],
  answer: '',
};

const SENDEMAIL = 'SEND_EMAIL';
const SENDNAME = 'SEND_NAME';
const CHANGE_SCORE = 'CHANGE_SCORE';
const REGISTER_ANSWER = 'REGISTER_ANSWER';

export default function nameAndEmail(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SENDEMAIL:
      return { ...state, email: action.email };
    case SENDNAME:
      return { ...state, name: action.name };
    case CHANGE_SCORE:
      return { ...state, scoreboard: action.score };
    case REGISTER_ANSWER:
      return { ...state, answer: action.answer };
    default:
      return state;
  }
}
