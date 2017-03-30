import * as actionTypes from '../constants/actionTypes';

export default function articles(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_ARTICLE:
      state.push(action.article);
      return state;
    default:
      return state;
  }
}
