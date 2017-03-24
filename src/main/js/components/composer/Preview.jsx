import React from 'react';
import {connect} from 'react-redux';
import { Row, Col} from 'react-bootstrap';
import Editor from 'draft-js-plugins-editor';

class Preview extends React.Component {
  render() {
    return (
      <Row>
        <Col md={12}>
          <div className={`editable, form-control EditorStyle`}>
            <Editor
              editorState={this.props.editorState}
              readOnly
            />
          </div>
        </Col>
      </Row>
    );
  }
}


Preview.propTypes = {
  editorState: React.PropTypes.object
};

export default Preview;
