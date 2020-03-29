import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import getQuestions from './getQuestions';
import timeReducer from './timeReducer';
import categoryReducer from './categoryReducer';
import difficultyreducer from './difficultyreducer';
import typeReducer from './typeReducer';

const rootReducer = () => combineReducers({
  gameReducer,
  getQuestions,
  timeReducer,
  categoryReducer,
  difficultyreducer,
  typeReducer,
});

export default rootReducer;
