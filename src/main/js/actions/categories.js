import CategoriesApi from "../api/CategoriesApi";
import {CATEGORIES_LOADED} from "../constants/actionTypes";

export function loadCategories() {
  return (dispatch) => {
    CategoriesApi.getCategories()
      .then((categories) => dispatch({type: CATEGORIES_LOADED, categories: categories.data}));
  };
}
