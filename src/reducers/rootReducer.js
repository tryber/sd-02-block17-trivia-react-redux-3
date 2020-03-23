import { combineReducers } from 'redux';
import getToken from './getToken';

const rootReducer = () => combineReducers({
  getToken,
});

export default rootReducer;
