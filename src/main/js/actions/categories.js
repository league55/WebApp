import axios from "axios";
import {CATEGORIES_LOADED} from "../constants/actionTypes";

export function loadCategories() {
  return (dispatch) => {
    axios.get('/categories')
      .then((categories) => {
        dispatch({type: CATEGORIES_LOADED, categories: categories.data})
      });
  };
}
