import { combineReducers } from 'redux';
import getToken from './getToken';
import gameReducer from './gameReducer';
import getQuestions from './getQuestions';
import categoryReducer from './categoryReducer';

const rootReducer = () => combineReducers({
  getToken,
  gameReducer,
  getQuestions,
  categoryReducer,
});

export default rootReducer;
