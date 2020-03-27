import { FORMAT_ANSWERS } from '../actions/GameActions';

export const INITIAL_STATE = {
  name: '',
  email: '',
  scoreboard: 0,
  wrongAnswerFlag: false,
  answersClasses: [],
};

const SENDEMAIL = 'SEND_EMAIL';
const SENDNAME = 'SEND_NAME';
const WRONG_ASNWER = 'WRONG_ANSWER';

export default function nameAndEmail(state = INITIAL_STATE, {
  type, email, name, answersClasses,
}) {
  switch (type) {
    case SENDEMAIL:
      return { ...state, email };
    case SENDNAME:
      return { ...state, name };
    case WRONG_ASNWER:
      return { ...state, wrongAnswerFlag: true };
    case FORMAT_ANSWERS:
      return { ...state, answersClasses };
    default:
      return state;
  }
}
