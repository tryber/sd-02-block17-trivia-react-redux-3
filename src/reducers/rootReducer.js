import { combineReducers } from 'redux';
import getToken from './getToken';
import nameAndEmail from './nameAndEmail';

const rootReducer = () => combineReducers({
  getToken,
  nameAndEmail,
});

export default rootReducer;
