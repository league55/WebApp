import React from 'react';
import {connect} from 'react-redux';
import { Row, Col} from 'react-bootstrap';

class Editor extends React.Component {
  render() {
    return (
      <Row>
        <Col md={8}>
          <textarea name="Text1" cols="100" rows="20"/>
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  mode: state.mode,
  article: ownProps.article
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Editor);
