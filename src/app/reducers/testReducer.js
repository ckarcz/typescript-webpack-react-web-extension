import * as TestActions from '../constants/TestActions';

const initialState = [{
  text: 'Initial State'
}];

const actionsMap = {
  [TestActions.THIS_ACTION](state, action) {
    return [{
      text: 'Test'
    }, ...state];
  }
};

export default function testReducer(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
