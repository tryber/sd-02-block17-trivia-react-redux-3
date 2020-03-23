import { combineReducers } from 'redux';
import getToken from './getToken';
import gameReducer from './gameReducer';

const rootReducer = () => combineReducers({
  getToken,
  gameReducer,
});

export default rootReducer;
