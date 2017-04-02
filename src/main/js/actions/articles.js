import * as actionTypes from '../constants/actionTypes';
import ArticlesDataApi from "../api/ArticlesDataApi";

function switchMode(mode) {
  return {
    type: actionTypes.SWITCH_MODE,
    mode
  };
}

export function saveAndSwitchMode(mode) {
  return (dispatch, getState) => {
    //  dispatch(saveArticle(article));

    if (getState().mode !== mode) {
      dispatch(switchMode(mode));
    }
  };
}

export function saveArticle(article, author) {
  return (dispatch => {
    ArticlesDataApi.saveArticle(article, author)
      .then((response) => dispatch({
        type: actionTypes.ADD_ARTICLE,
        article
      }));
  });
}

