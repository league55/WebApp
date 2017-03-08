import React from 'react';


class Heading extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.content}</h2>
      </div>

    );
  }
}


Heading.propTypes = {
  content: React.PropTypes.string
};

export default Heading;
