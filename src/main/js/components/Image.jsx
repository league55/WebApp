import React from 'react';
import { Image } from 'react-bootstrap';

class Paragraph extends React.Component {

  render() {
    const src = require(`../../img/pokemons/1/${this.props.content.src}.svg`);
    return (
      <div>
        <Image src={src} responsive/>
        <span>{this.props.content.name}</span>
      </div>
    );
  }
}


Paragraph.propTypes = {
  content: React.PropTypes.object
};

export default Paragraph;

