import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Row, Col, Label} from 'react-bootstrap';
import Editor from 'draft-js-plugins-editor';
import {EditorState, convertFromRaw} from 'draft-js';
import {refreshArticles} from '../actions/actions';

import './CommentList.scss';

class LatestArticlesList extends React.Component {

  componentDidMount() {
    if (this.props.articles.length === 0) {
      this.props.dispatch(refreshArticles());
    }
  }

  handleRefreshComments() {
    this.props.dispatch(refreshArticles());
  }

  render() {
    return (
      <div className="comments">
        <h1>Latest</h1>
        <div>
          <Link to="/addArticle" className="btn btn-primary">Add Article</Link>
          {' '}
          <button className="btn btn-default" onClick={() => this.handleRefreshComments()}>Refresh</button>
        </div>
        { !this.props.articles || this.props.articles.length === 0
          ? <p>No articles yet! You could add one&hellip;?</p>
          : this.props.articles.map(each => LatestArticlesList.getArticlePreview(each)) }
      </div>
    );
  }

  static getArticlePreview(each) {
    return (<div className="message">
      <Row>
        <Col md={8} mdOffset={1}>
          <h1>{each.title}</h1>
        </Col>
        <Col md={1} mdOffset={1}>
          <h3><Label bsStyle="info">{each.createDate}</Label></h3>
        </Col>
      </Row>
      <hr/>
      <Editor
        editorState={EditorState.createWithContent(convertFromRaw(each.content))} readOnly
        key={each.title + each.articleId}
        onChange={() => {
        }}/>
      <Link to={`/article/${each.articleId}`} bsStyle="info" className="btn btn-info">Подробнее</Link>
    </div>);
  }
}


LatestArticlesList.propTypes = {
  articles: React.PropTypes.array,
  dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

export default connect(mapStateToProps)(LatestArticlesList);
