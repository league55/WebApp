import * as actionTypes from '../constants/actionTypes';

export default function articles(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_ARTICLE:
      if (!state.find((article) => article.articleId === action.article.articleId)) {
        return newArticles.concat(state);
      }
      return state;
    case actionTypes.ARTICLES_REFRESHED:
      const newArticles =
        action.articles.map((each) => Object.assign(each, {content: JSON.parse(each.content)}));
      return state.concat(newArticles);
    default:
      return state;
  }
}
