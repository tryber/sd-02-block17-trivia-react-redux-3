import { combineReducers } from 'redux';
import getToken from './getToken';
import gameReducer from './gameReducer';
import getQuestions from './getQuestions';

const rootReducer = () => combineReducers({
  getToken,
  gameReducer,
  getQuestions,
});

export default rootReducer;
