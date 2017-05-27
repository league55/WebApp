import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import shallowCompare from 'react-addons-shallow-compare';
import {Row, Col, Label, Button} from 'react-bootstrap';
import {EditorState, convertFromRaw} from 'draft-js';
import '../CommentList.scss';
import RichEditor from './RichEditor';
import {deleteArticle} from "../../actions/articles";

class SearchedArticles extends React.Component {

  constructor() {
    super();
    this.getArticlePreview = this.getArticlePreview.bind(this);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    const query = this.props.params.searchQuery;
    axios.get(`/article/search?searchQuery=${query}`)
      .then(res => {
        this.setState({articles: res.data, lastQuery: query});
      });
  }

  componentDidMount() {
    const query = this.props.params.searchQuery;
    axios.get(`/article/search?searchQuery=${query}`)
      .then(res => {
        this.setState({articles: res.data, lastQuery: query});
      });
  }

  render() {
    const articles = this.state.articles;
    return (
      <div className="comments">
        <h1>Поиск по запросу </h1> <h2> "{this.props.params.searchQuery}"</h2>
        { !articles
          ? <p> Не удалось ничего найти :(</p>
          : articles.map((each, i) => this.getArticlePreview(each, i)) }
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
        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(each.content)))}
        readOnly/>
      {this.props.auth.roles.includes("ROLE_ADMIN")
      && <Button
        onClick={() => this.props.deleteArticle(each)}
        key={`${each.modifyDate}_LINK`}
        bsStyle="danger"
      >Удалить</Button>}
    </div>);
  }
}


SearchedArticles.propTypes = {
  auth: React.PropTypes.object,
  deleteArticle: React.PropTypes.func,
  params: React.PropTypes.object,
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
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchedArticles);
