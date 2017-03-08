import React from 'react';
import {connect} from 'react-redux';
import { Row, Col} from 'react-bootstrap';
import buildArticle from '../../dynamic/ArticleBuilder';

class Preview extends React.Component {
  render() {
    return (
      <Row>
        <Col md={8} mdOffset={2}>
          {buildArticle(this.props.article)}
        </Col>
      </Row>
    );
  }
}


Preview.propTypes = {
  article: React.PropTypes.object
};

const mapStateToProps = (state) => ({
  mode: state.mode,
  article: state.article
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Preview);
