import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {RichUtils, AtomicBlockUtils, Entity} from 'draft-js';
import Editor, {composeDecorators} from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import ImageUploader from './ImageUploader'; // eslint-disable-line
import './ArticleEditor.css'; // eslint-disable-line
import '../../../css/Editor.scss'; // eslint-disable-line
import {InlineStyleControls} from './InlineStyleControls';
import {BlockStyleControls} from './BlockStyleControls';

require("draft-js-image-plugin/lib/plugin.css"); // eslint-disable-line import/no-unresolved

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({decorator});

const plugins = [
  blockDndPlugin,
  focusPlugin,
  resizeablePlugin,
  imagePlugin
];

class ArticleEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: props.editorState
    };

    this.onChange = this._onChange.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.handleImagesAdd = this._handleImagesAdd.bind(this);
    this.focus = () => this.focus.bind(this);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onChange(editorState) {
    this.props.onEditorStateUpdate(editorState);
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    );
  }

  _handleTitleChange(e) {
    this.props.handleTitleChange(e.target.value);
  }

  _handleCategoryIdChange(value) {
    this.props.handleCategoryIdChange(value);
  }

  focus() {
    this.editor.focus();
  }

  _handleImagesAdd(images) {
    let editorState = this.props.editorState;
    images.forEach(image => {
      editorState = AtomicBlockUtils.insertAtomicBlock(
        editorState, Entity.create('image', 'IMMUTABLE', {src: `static/${image.name}`, progress: -1}), ' ');
    });
    this.onChange(editorState);
  }

  render() {
    const {editorState} = this.props;
    return (<div>
      <Row>
        <Col md={12}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <ImageUploader handleImagesAdd={this.handleImagesAdd}/>
          <div className="editorStyles.editor EditorStyle" onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              ref={(element) => {
                this.editor = element;
              }}
              spellCheck
              plugins={plugins}
            />
          </div>
        </Col>
      </Row>

    </div>);
  }


}

ArticleEditor.propTypes = {
  editorState: React.PropTypes.object,
  onEditorStateUpdate: React.PropTypes.func,
  handleCategoryIdChange: React.PropTypes.func,
  handleTitleChange: React.PropTypes.func
};


export default ArticleEditor;
