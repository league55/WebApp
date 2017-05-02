import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import {Row, Col, Label} from 'react-bootstrap';
import {EditorState, convertFromRaw} from 'draft-js';
import {loadPageArticles} from '../../actions/actions';

import '../CommentList.scss';
import RichEditor from './RichEditor';
import PaginationBlock from "./PaginationBlock";

class LatestArticlesList extends React.Component {

  constructor() {
    super();
    this.getPaginationBlock = this.getPaginationBlock.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    const articles = this.props.articles;
    const category = this.props.params.category ? this.props.params.category : 'latest';

    if (!articles.get(category) || articles.get(category).length === 0) {
      this.props.dispatch(loadPageArticles(0, this.props.params.category));
    }
  }

  handleRefreshComments() {
    this.props.dispatch(loadPageArticles(0, this.props.params.category));
  }

  render() {
    const articles = this.props.articles;
    const category = this.props.params.category ? this.props.params.category : 'latest';
    return (
      <div className="comments">
        <h1>Свежие</h1>
        <button className="btn btn-default" onClick={() => this.handleRefreshComments()}>Refresh</button>
        { !articles || !articles.get(category) || articles.get(category).length === 0
          ? <p> Пока ничего нет :( Стань первым ? </p>
          : articles.get(category).map((each, i) => LatestArticlesList.getArticlePreview(each, i)) }

        {this.getPaginationBlock()}
      </div>
    );
  }

  static getArticlePreview(each) {
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
      <Link
        to={`/article/${each.articleId}`}
        key={`${each.modifyDate}_LINK`}
        bsStyle="info"
        className="btn btn-info">Подробнее</Link>
    </div>);
  }

  getPaginationBlock() {
    const category = this.props.params.category;
    const pseudoCat = category || 'latest';
    const page = this.props.articles.get(pseudoCat) ? this.props.articles.get(pseudoCat).length : 0;
    return (<PaginationBlock
      clickMore={() => {
        this.props.dispatch(loadPageArticles(page, category));
        this.forceUpdate();
      }}/>);
  }

}


LatestArticlesList.propTypes = {
  articles: React.PropTypes.object,
  params: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    articles: state.articles,
    categories: state.categories
  };
}

export default connect(mapStateToProps)(LatestArticlesList);
