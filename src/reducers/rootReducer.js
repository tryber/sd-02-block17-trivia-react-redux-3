import { combineReducers } from 'redux';
import getToken from './getToken';
import getQuestions from './getQuestions';

const rootReducer = () => combineReducers({
  getToken,
  getQuestions,
});

export default rootReducer;
