import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import ArticleEditora from './ArticleEditor.css';
import EditorStyle from '../../../css/Editor.scss';
import {InlineStyleControls} from './InlineStyleControls';
import {BlockStyleControls} from './BlockStyleControls';

class ArticleEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: props.editorState
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.onChange = this._onChange.bind(this);
    this.focus = () => this.refs.editor.focus();

    this.onTab = (e) => this._onTab(e);
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

  render() {
    let editorState = this.props.editorState;
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
          <div className={`editable, form-control EditorStyle`} onClick={this.focus}>
            <Editor
              editorState={editorState}
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              ref="editor"
              onTab={this.onTab}
              spellCheck
              plugins={[]}
            />
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

export default ArticleEditor;
