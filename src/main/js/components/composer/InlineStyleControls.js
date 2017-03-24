import React from 'react';
import StyleButton from './StyleButton';

export const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  InlineStyleControls.propTypes = {
    editorState: React.PropTypes.any,
    onToggle: React.PropTypes.func
  };

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'}
];
