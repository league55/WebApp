import * as actionTypes from '../constants/actionTypes';

export default function categories(state = [], action) {
  switch (action.type) {
    case actionTypes.CATEGORIES_LOADED:
      return action.categories;
    default:
      return state;
  }
}
