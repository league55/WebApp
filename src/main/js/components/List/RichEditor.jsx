import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Editor, {composeDecorators} from 'draft-js-plugins-editor';
import shallowCompare from 'react-addons-shallow-compare';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import ImageUploader from '../composer/ImageUploader'; // eslint-disable-line
import ArticleEditora from '../composer/ArticleEditor.css'; // eslint-disable-line
import '../../../css/Editor.scss'; // eslint-disable-line

require("draft-js-image-plugin/lib/plugin.css"); // eslint-disable-line import/no-unresolved

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({decorator});

const plugins = [
  blockDndPlugin,
  focusPlugin,
  resizeablePlugin,
  alignmentPlugin,
  imagePlugin
];


class RichEditor extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {editorState} = this.props;
    return (<div>
      <Row>
        <Col md={12}>
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={() => {
            }}
            ref={(element) => {
              this.editor = element;
            }}
            readOnly
            plugins={plugins}
          />
        </Col>
      </Row>

    </div>);
  }

}

RichEditor.propTypes = {
  editorState: React.PropTypes.object
};
export default RichEditor;
