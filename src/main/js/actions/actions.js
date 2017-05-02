import axios from 'axios';
import {ARTICLES_REFRESHED, AUTHENTICATED, LOGGED_OUT} from "../constants/actionTypes";

export function articlesRefreshed(articles, category = 'latest') {
  return {
    type: ARTICLES_REFRESHED,
    category,
    articles
  };
}

export function refreshArticles() {
  return dispatch => {
    axios.get('/article')
      .then(
        success => dispatch(articlesRefreshed(success.data)),
        failure => console.log(failure)
      );
  };
}

export function loadPageArticles(page = 0, category) {
  return dispatch => {
    const url = category ? `/article/category/${category}?page=${page}` : `/article?page=${page}`;
    axios.get(url)
      .then(
        success => dispatch(articlesRefreshed(success.data, category)),
        failure => console.log(failure)
      );
  };
}

export function authenticated(authData) {
  return {
    type: AUTHENTICATED,
    roles: authData.roles
  };
}

export function loggedOut() {
  return {
    type: LOGGED_OUT
  };
}
