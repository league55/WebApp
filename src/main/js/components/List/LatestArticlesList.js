import React from 'react';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import {Row, Col, Label, Button} from 'react-bootstrap';
import {EditorState, convertFromRaw} from 'draft-js';
import {loadPageArticles} from '../../actions/actions';

import '../CommentList.scss';
import RichEditor from './RichEditor';
import PaginationBlock from "./PaginationBlock";
import {deleteArticle} from "../../actions/articles";
import {LATEST} from "../../constants/actionTypes";

class LatestArticlesList extends React.Component {

  constructor() {
    super();
    this.getPaginationBlock = this.getPaginationBlock.bind(this);
    this.getArticlePreview = this.getArticlePreview.bind(this);
    this.getPageName = this.getPageName.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    const articles = this.props.articles;
    const category = this.props.params.category ? this.props.params.category : LATEST;

    if (!articles.get(category) || articles.get(category).length === 0) {
      this.props.loadArticles(0, this.props.params.category);
    }
  }

  handleRefreshComments() {
    this.props.loadArticles(0, this.props.params.category);
  }

  render() {
    const articles = this.props.articles;
    const category = this.props.params.category ? this.props.params.category : LATEST;
    return (
      <div className="comments">
        <h1>{this.getPageName(category)}</h1>
        <button className="btn btn-default" onClick={() => this.handleRefreshComments()}>Обновить</button>
        { !articles || !articles.get(category) || articles.get(category).length === 0
          ? <p> Пока ничего нет :( Стань первым ? </p>
          : articles.get(category).map((each, i) => this.getArticlePreview(each, i)) }

        {this.getPaginationBlock()}
      </div>
    );
  }

  getArticlePreview(each) {
    return (<div className="message well" key={each.modifyDate + each.articleId}>
      <Row>
        <Col md={8} mdOffset={1}>
          <h1>{each.title}</h1>
        </Col>
        <Col md={1} mdOffset={1}>
          <h4><Label bsStyle="info">{each.createDate}</Label></h4>
        </Col>
      </Row>
      <hr/>
      <RichEditor
        key={`editor${each.modifyDate}${each.articleId}`}
        editorState={EditorState.createWithContent(convertFromRaw(each.content))}
        readOnly/>
      {this.props.auth.roles.includes("ROLE_ADMIN")
      && <Button
        onClick={() => this.props.deleteArticle(each)}
        key={`${each.modifyDate}_LINK`}
        bsStyle="danger"
      >Удалить</Button>}
    </div>);
  }

  getPaginationBlock() {
    const category = this.props.params.category;
    const pseudoCat = category || LATEST;
    const page = this.props.articles.get(pseudoCat) ? this.props.articles.get(pseudoCat).length : 0;
    return (<PaginationBlock
      clickMore={() => {
        this.props.loadArticles(page, category);
        this.forceUpdate();
      }}/>);
  }

  getPageName(categoryId) {
    if (!categoryId || categoryId === "latest") {
      return "Свежие";
    }
    const currentCategory = this.props.categories.find(cat => cat.categoryId === categoryId);
    return currentCategory.categoryName;
  }

}


LatestArticlesList.propTypes = {
  auth: React.PropTypes.object,
  articles: React.PropTypes.object,
  categories: React.PropTypes.array,
  params: React.PropTypes.object,
  deleteArticle: React.PropTypes.func,
  loadArticles: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    articles: state.articles,
    categories: state.categories,
    auth: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    deleteArticle(article) {
      dispatch(deleteArticle(article));
    },
    loadArticles(article, category) {
      dispatch(loadPageArticles(article, category));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestArticlesList);
