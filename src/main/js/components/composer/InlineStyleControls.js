import React from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import StyleButton from './StyleButton';

export const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  InlineStyleControls.propTypes = {
    editorState: React.PropTypes.any,
    onToggle: React.PropTypes.func
  };

  return (
    <ButtonToolbar className="ButtonToolbar--align--small">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </ButtonToolbar>
  );
};

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'}
];
