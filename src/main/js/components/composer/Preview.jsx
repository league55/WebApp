import React from 'react';
import {Row, Col, Label} from 'react-bootstrap';
import Editor from 'draft-js-plugins-editor';

class Preview extends React.Component {
  render() {
    return (
      <Row>
        <Col md={12}>
          <div className="message">
            <Row>
              <Col md={7} mdOffset={1}>
                <h1>{this.props.title}</h1>
              </Col>
              <Col md={1} mdOffset={1}>
                <h3><Label bsStyle="info">{new Date().toLocaleDateString()}</Label></h3>
              </Col>
            </Row>
            <hr/>
            <Col md={9} className=" --noFloat">
              <Editor
                editorState={this.props.editorState} readOnly
                onChange={() => {}}/>
            </Col>
          </div>
        </Col>
      </Row>
    );
  }
}


Preview.propTypes = {
  editorState: React.PropTypes.object,
  title: React.PropTypes.string
};

export default Preview;
