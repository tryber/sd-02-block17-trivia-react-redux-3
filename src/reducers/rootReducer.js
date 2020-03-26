import { combineReducers } from 'redux';
import getToken from './getToken';
import gameReducer from './gameReducer';
import getQuestions from './getQuestions';
import timeReducer from './timeReducer';

const rootReducer = () => combineReducers({
  getToken,
  gameReducer,
  getQuestions,
  timeReducer,
});

export default rootReducer;
