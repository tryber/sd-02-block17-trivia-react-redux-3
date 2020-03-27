import { combineReducers } from 'redux';
import getToken from './getToken';
import gameReducer from './gameReducer';
import getQuestions from './getQuestions';
import timeReducer from './timeReducer';
import categoryReducer from './categoryReducer';
import difficultyreducer from './difficultyreducer';
import typeReducer from './typeReducer';
import getQuestionsNumber from './getQuestionsNumber';

const rootReducer = () => combineReducers({
  getToken,
  gameReducer,
  getQuestions,
  timeReducer,
  categoryReducer,
  difficultyreducer,
  typeReducer,
  getQuestionsNumber,
});

export default rootReducer;
