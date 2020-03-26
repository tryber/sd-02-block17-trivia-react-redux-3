import { combineReducers } from 'redux';
import getToken from './getToken';
import gameReducer from './gameReducer';
import getQuestions from './getQuestions';
import categoryReducer from './categoryReducer';
import difficultyreducer from './difficultyreducer';

const rootReducer = () => combineReducers({
  getToken,
  gameReducer,
  getQuestions,
  categoryReducer,
  difficultyreducer,
});

export default rootReducer;
