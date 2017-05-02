import {Map} from 'immutable';
import * as actionTypes from '../constants/actionTypes';
import {IN_PROGRESS} from "../constants/appConstants";

export default function articles(state = new Map(), action) {
  switch (action.type) {
    case actionTypes.ARTICLES_REFRESHED:
      const newArticles =
        action.articles.map((each) => Object.assign(each, {content: JSON.parse(each.content)}));
      return state.set(action.category, state.get(action.category, []).concat(newArticles));
    case actionTypes.ADD_NON_COMPLETE_ARTICLE:
      return state.set(IN_PROGRESS, action.article);
    case actionTypes.DELETE_ARTICLE:
      let category = state.get(action.article.categoryId, []);
      let latest = state.get(actionTypes.LATEST);
      category = category.filter((article) => article.articleId !== action.articleId);
      latest = latest.filter((article) => article.articleId !== action.article.articleId);
      category = category.filter((article) => article.articleId !== action.article.articleId);
      return state.set(actionTypes.LATEST, latest).set(action.article.categoryId, category);
    default:
      return state;
  }
}
