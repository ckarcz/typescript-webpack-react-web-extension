import { combineReducers } from 'redux';
import testReducer from './testReducer';

function emptyReducer(state) {
  if (state == null) return [];
  return state;
}

export default combineReducers({
  emptyReducer,
  testReducer
});
