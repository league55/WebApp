import axios from 'axios';
import {ARTICLES_REFRESHED} from "../constants/actionTypes";

export const AUTHENTICATED = 'AUTHENTICATED';
export const LOGGED_OUT = 'LOGGED_OUT';

export function articlesRefreshed(articles) {
  return {
    type: ARTICLES_REFRESHED,
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

export function loadPageArticles(page = 0) {
  return dispatch => {
    axios.get(`/article?page=${page}`)
      .then(
        success => dispatch(articlesRefreshed(success.data)),
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
