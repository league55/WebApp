import {Map} from 'immutable';
import * as actionTypes from '../constants/actionTypes';

export default function articles(state = new Map(), action) {
  switch (action.type) {
    case actionTypes.ARTICLES_REFRESHED:
      const newArticles =
        action.articles.map((each) => Object.assign(each, {content: JSON.parse(each.content)}));
      return state.set(action.category, state.get(action.category, []).concat(newArticles));
    default:
      return state;
  }
}
