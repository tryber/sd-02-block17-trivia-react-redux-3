import { FORMAT_ANSWERS } from '../actions/GameActions';
import { RESET_POINTS } from '../actions/resetPoints';
import { SEND_IMAGE_URL } from '../actions/HeaderActions';
import { SET_RANKED_LADDER } from '../actions/RankingActions';

export const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
  wrongAnswerFlag: false,
  answersClasses: [],
  question: {},
  imageUrl: '',
  rankedLadder: [],
};
const QUESTION = 'QUESTION';
const SENDEMAIL = 'SEND_EMAIL';
const SENDNAME = 'SEND_NAME';
const WRONG_ASNWER = 'WRONG_ANSWER';
const SET_POINTS = 'SET_POINTS';
const ERROR = 'ERROR';

export default function gameReducer(state = INITIAL_STATE, {
  type, email, name, answersClasses, points, error, question, imageUrl, rankedLadder,
}) {
  switch (type) {
    case SENDEMAIL:
      return { ...state, gravatarEmail: email };
    case SENDNAME:
      return { ...state, name };
    case WRONG_ASNWER:
      return { ...state, wrongAnswerFlag: true };
    case FORMAT_ANSWERS:
      return { ...state, answersClasses };
    case SET_POINTS:
      return {
        ...state, score: state.score + points, assertions: state.assertions + 1,
      };
    case ERROR:
      return { ...state, name: error, gravatarEmail: '' };
    case RESET_POINTS:
      return INITIAL_STATE;
    case QUESTION:
      return { ...state, question };
    case SEND_IMAGE_URL:
      return { ...state, imageUrl };
    case SET_RANKED_LADDER:
      return { ...state, rankedLadder };
    default:
      return state;
  }
}
