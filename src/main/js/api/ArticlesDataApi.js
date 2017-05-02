import axios from 'axios';

class ArticlesDataApi {

  static saveArticle(article, author) {
    const copy = Object.assign({}, article, {content: JSON.stringify(article.content)});
    const url = article.id ? `/article/${article.id}` : '/article';
    return axios.post(url, {article: copy, userName: author.userName});
  }

  static deleteArticle(articleId) {
    return axios.delete(`/article/${articleId}`);
  }
}

export default ArticlesDataApi;
