import React from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import StyleButton from './StyleButton';
/* {label: 'H1', style: 'header-one'},
 {label: 'H2', style: 'header-two'},*/
const BLOCK_TYPES = [
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

export const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection ? editorState.getSelection() : editorState.getSelectionAfter();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  BlockStyleControls.propTypes = {
    editorState: React.PropTypes.any,
    onToggle: React.PropTypes.func
  };

  return (
    <ButtonToolbar className="ButtonToolbar--align--big">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </ButtonToolbar>
  );
};
