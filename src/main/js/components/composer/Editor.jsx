import React from 'react';
import {connect} from 'react-redux';
import { Row, Col} from 'react-bootstrap';

class Editor extends React.Component {
  render() {
    return (
      <Row>
        <Col md={8}>
          <div className="editable, form-control" contentEditable="true" onBlur={this.props.onBlur}>
            Editable text...
          </div>
        </Col>
      </Row>
    );
  }
}

Editor.propTypes = {
  onBlur: React.PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  mode: state.mode,
  article: ownProps.article
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Editor);
