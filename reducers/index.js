import { combineReducers } from 'redux';
import decks from './decks';
import profile from './profile';

export default combineReducers({
  decks,
  profile,
});
