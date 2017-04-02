import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Editor from 'draft-js-plugins-editor';
import {EditorState, convertFromRaw} from 'draft-js';
import {refreshArticles} from '../actions/actions';

import './CommentList.scss';

class CommentList extends React.Component {

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
        <h1>Messages</h1>
        <div>
          <Link to="/add" className="btn btn-primary">Add Comment</Link>
          {' '}
          <button className="btn btn-default" onClick={() => this.handleRefreshComments()}>Refresh</button>
        </div>
        { !this.props.articles || this.props.articles.length === 0
          ? <p>No articles yet! You could add one&hellip;?</p>
          : this.props.articles.map(each => CommentList.getArticlePreview(each)) }
      </div>
    );
  }

  static getArticlePreview(each) {
    return (<div className="message">
      <h3>{each.title}</h3>
      <Editor
        editorState={EditorState.createWithContent(convertFromRaw(each.content))} readOnly key={each.id}
        onChange={() => {
        }}/>
    </div>);
  }
}


CommentList.propTypes = {
  articles: React.PropTypes.array,
  dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

export default connect(mapStateToProps)(CommentList);
