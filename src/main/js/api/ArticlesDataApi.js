import axios from 'axios';

class ArticlesDataApi {

  static saveArticle(article) {
    const copy = Object.assign(article, {content: JSON.stringify(article.content)});
    return axios.post('/article/3', {article: copy, userId: 1});
  }
}

export default ArticlesDataApi;
