import React from 'react';
import {ButtonGroup, Button, Row, Col} from "react-bootstrap";
import "./Latest.css";

class PaginationBlock extends React.Component {

  render() {
    return (
      <Row className="Footer">
        <Col md={3} mdOffset={4} xs={12}>
          <ButtonGroup vertical block>
            <Button
              bsStyle="primary"
              onClick={this.props.clickMore}>
              +Больше
            </Button>
          </ButtonGroup>
        </Col>
      </Row>);
  }
}

PaginationBlock.propTypes = {
  clickMore: React.PropTypes.func
};

export default PaginationBlock;
