import axios from 'axios';

class CategoriesApi {

  static getCategories() {
    return axios.get('/categories');
  }
}

export default CategoriesApi;
