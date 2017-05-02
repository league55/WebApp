import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, FormControl, FormGroup} from 'react-bootstrap';
import {RichUtils, AtomicBlockUtils, Entity} from 'draft-js';
import Editor, {composeDecorators} from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import {Dropdown} from "react-toolbox/lib/dropdown";
import ImageUploader from './ImageUploader'; // eslint-disable-line
import './ArticleEditor.css'; // eslint-disable-line
import '../../../css/Editor.scss'; // eslint-disable-line
import {InlineStyleControls} from './InlineStyleControls';
import {BlockStyleControls} from './BlockStyleControls';
import {loadCategories} from "../../actions/categories";

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
    this.getCategories = this._getCategories.bind(this);
    this.focus = () => this.focus.bind(this);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.getValidationState = (style) => this._getValidationState(style);
    this.handleCategoryIdChange = (style) => this._handleCategoryIdChange(style);
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

  _getValidationState() {
    if (!this.props.title) return null;
    const length = this.props.title.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    return 'error';
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
        <Row>
          <Col md={4} mdOffset={1}>
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
          <Col md={4} mdOffset={1}>
            <Dropdown
              source={this.getCategories()}
              onChange={this.handleCategoryIdChange}
              value={this.props.categoryId}
            />
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

  _getCategories() {
    if (!this.props.categories) {
      this.props.loadCategories();
    }
    else {
      const categories = this.props.categories.map(cat => {
        return {value: cat.categoryId, label: cat.categoryName};
      });
      const defaultCategory = [{value: undefined, label: "Выберите категорию"}];
      return defaultCategory.concat(categories);
    }
    return {};
  }

}

ArticleEditor.propTypes = {
  editorState: React.PropTypes.object,
  onEditorStateUpdate: React.PropTypes.func,
  categories: React.PropTypes.array,
  title: React.PropTypes.string,
  categoryId: React.PropTypes.string,
  handleCategoryIdChange: React.PropTypes.func,
  loadCategories: React.PropTypes.func,
  handleTitleChange: React.PropTypes.func
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
  loadCategories() {
    dispatch(loadCategories());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);
