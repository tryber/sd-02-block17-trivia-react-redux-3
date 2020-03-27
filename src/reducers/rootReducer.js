import { combineReducers } from 'redux';
import getToken from './getToken';
import gameReducer from './gameReducer';
import getQuestions from './getQuestions';
import timeReducer from './timeReducer';
import categoryReducer from './categoryReducer';
import difficultyreducer from './difficultyreducer';
import typeReducer from './typeReducer';

const rootReducer = () => combineReducers({
  getToken,
  gameReducer,
  getQuestions,
  timeReducer,
  categoryReducer,
  difficultyreducer,
  typeReducer,
});

export default rootReducer;
