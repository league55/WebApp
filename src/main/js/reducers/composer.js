import * as actionTypes from '../constants/actionTypes';

const defaultState = {
  mode: actionTypes.EDITING
};


export default function composer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SWITCH_MODE:
      return Object.assign({}, state, { mode: action.mode });
    default:
      return state;
  }
}
