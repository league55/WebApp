import React from 'react';

class Article extends React.Component {
  render() {
    return (<div className="jumbotron">
      <h1>{this.props.title}</h1>
      {this.props.content}
    </div>
    );
  }
}

Article.propTypes = {
  title: React.PropTypes.string,
  content: React.PropTypes.object
};

export default Article;
