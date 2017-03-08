import React from 'react';

class Paragraph extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.content}</p>
      </div>
    );
  }
}


Paragraph.propTypes = {
  content: React.PropTypes.object
};

export default Paragraph;
