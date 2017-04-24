import React from 'react';
import {Link} from 'react-router';

class PaginationBlock extends React.Component {

  constructor() {
    super();

    this.getButtons = this.getButtons.bind(this);
  }

  render() {
    return (
      <div className="Footer">
        { this.getButtons() }
      </div>);
  }

  getButtons() {
    const pagesAmount = 6;
    const buttons = [];
    const current = this.props.currentPage;
    if (pagesAmount > 5) {
      for (let i = 0; i < 5; i++) {
        const className = "btn btn-primary";
        buttons.push((<Link to={`/latest/${i}`} bsSize="xs" className={className} key={"links" + i}>{i}</Link>));
      }
      // buttons.push(<span>...</span>);
      buttons.push(<Link to={`/latest/${pagesAmount}`} bsSize="xs">{pagesAmount}</Link>);
    }
    return buttons;
  }
}

PaginationBlock.propTypes = {
  currentPage: React.PropTypes.string
};

export default PaginationBlock;
