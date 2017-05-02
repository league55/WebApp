import * as actionTypes from '../constants/actionTypes';
import ArticlesDataApi from "../api/ArticlesDataApi";

export function saveArticle(article, author) {
  return (dispatch => {
    ArticlesDataApi.saveArticle(article, author)
      .then(() => dispatch({
        type: actionTypes.ADD_NON_COMPLETE_ARTICLE,
        article
      }));
  });
}

export function postArticle(article, author) {
  return (dispatch => {
    ArticlesDataApi.saveArticle(article, author)
      .then(() => dispatch({
        type: actionTypes.ADD_ARTICLE,
        article
      }));
  });
}

export function deleteArticle(article) {
  return (dispatch => {
    ArticlesDataApi.deleteArticle(article.articleId)
      .then(() => dispatch({
        type: actionTypes.DELETE_ARTICLE,
        article
      }));
  });
}

