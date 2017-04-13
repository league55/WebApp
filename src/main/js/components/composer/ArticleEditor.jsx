import React from 'react';
import {Row, Col, FormControl, FormGroup} from 'react-bootstrap';
import {RichUtils, AtomicBlockUtils, Entity} from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import 'draft-js-image-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import ImageUploader from './ImageUploader'; // eslint-disable-line
import ArticleEditora from './ArticleEditor.css'; // eslint-disable-line
import EditorStyle from '../../../css/Editor.scss'; // eslint-disable-line
import {InlineStyleControls} from './InlineStyleControls';
import {BlockStyleControls} from './BlockStyleControls';

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

const imagePlugin = createImagePlugin({ decorator, type: "atomic" });

const plugins = [
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin
];

const { AlignmentTool } = alignmentPlugin;

class ArticleEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: props.editorState
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.onChange = this._onChange.bind(this);
    this.handleImagesAdd = this._handleImagesAdd.bind(this);

    this.focus = () => this.refs.editor.focus();
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.getValidationState = (style) => this._getValidationState(style);
    this.handleTitleChange = (style) => this._handleTitleChange(style);
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

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth));
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

  _getValidationState() {
    if (!this.props.title) return null;
    const length = this.props.title.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    return 'error';
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
    const editorState = this.props.editorState;
    return (<div>
      <Row>
        <Row>
          <Col md={8} mdOffset={1}>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <FormControl
                type="text"
                value={this.props.title}
                placeholder="Заголовок"
                onChange={this.handleTitleChange}
              />
              <FormControl.Feedback />
            </FormGroup>
          </Col>
        </Row>
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
          <div className={`editable, form-control EditorStyle`} >
            <div className="EditorStyles.editor editor" onClick={this.focus}>
            <Editor
              editorState={editorState}
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              ref="editor"
              onTab={this.onTab}
              spellCheck
              plugins={plugins}
            />
            <AlignmentTool />
            </div>
          </div>
        </Col>
      </Row>

    </div>);
  }

}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

ArticleEditor.propTypes = {
  editorState: React.PropTypes.object,
  onEditorStateUpdate: React.PropTypes.func,
  title: React.PropTypes.string,
  handleTitleChange: React.PropTypes.func,
};
export default ArticleEditor;
