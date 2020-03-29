import { FORMAT_ANSWERS } from '../actions/GameActions';

export const INITIAL_STATE = {
  name: '',
  email: '',
  scoreboard: 0,
  rightQuestions: 0,
  wrongAnswerFlag: false,
  answersClasses: [],

};

const SENDEMAIL = 'SEND_EMAIL';
const SENDNAME = 'SEND_NAME';
const WRONG_ASNWER = 'WRONG_ANSWER';
const SET_POINTS = 'SET_POINTS';
const ERROR = 'ERROR';

export default function nameAndEmail(state = INITIAL_STATE, {
  type, email, name, answersClasses, points, error
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
    case SET_POINTS:
      return {
        ...state, scoreboard: state.scoreboard + points, rightQuestions: state.rightQuestions + 1,
      };
    case ERROR:
      return { ...state, name: error, email: '' };
    default:
      return state;
  }
}
