import React from 'react';
import {Button} from 'react-bootstrap';

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let bsStyle = "default";
    if (this.props.active) {
      bsStyle = "primary";
    }

    StyleButton.propTypes = {
      onToggle: React.PropTypes.func,
      active: React.PropTypes.any,
      style: React.PropTypes.any,
      label: React.PropTypes.string
    };

    return (
      <Button bsStyle={bsStyle} onClick={this.onToggle}>
        {this.props.label}
      </Button>
    );
  }
}

export default StyleButton;
