import * as actionTypes from '../constants/actionTypes';

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

export function saveArticle(article) {
  return {
    type: actionTypes.ADD_ARTICLE,
    article
  };
}

