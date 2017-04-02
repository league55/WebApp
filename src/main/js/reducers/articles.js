import * as actionTypes from '../constants/actionTypes';

export default function articles(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_ARTICLE:
      state.push(action.article);
      return state;
    case actionTypes.ARTICLES_REFRESHED:
      return action.articles.map(each => Object.assign(each, {content: JSON.parse(each.content)}));
    default:
      return state;
  }
}
