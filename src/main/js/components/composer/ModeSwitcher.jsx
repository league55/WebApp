import React from 'react';
import { Row, Col, Nav, NavItem} from 'react-bootstrap';
import {EDITING, PREVIEW} from '../../constants/actionTypes';

class ModeSwitcher extends React.Component {
  render() {
    const activeKey = this.props.activeKey ? this.props.activeKey : EDITING;
    return (
      <Row>
        <Col md={10} mdOffset={1}>
          <Nav bsStyle="tabs" activeKey={activeKey} justified onSelect={this.props.handleSelect}>
            <NavItem eventKey={EDITING} href="/home">Редактирование</NavItem>
            <NavItem eventKey={PREVIEW} title="Item">Предпросмотр</NavItem>
          </Nav>
        </Col>
      </Row>
    );
  }
}


ModeSwitcher.propTypes = {
  activeKey: React.PropTypes.string,
  handleSelect: React.PropTypes.func
};


export default ModeSwitcher;

/**
 * DROPDOWN OPTION
 * <DropdownButton bsStyle={'default'} title={'Режим'} onSelect={this.props.handleSelect} noCaret>
 <MenuItem eventKey={EDITING}>Редактирование</MenuItem>
 <MenuItem eventKey={PREVIEW}>Предпросмотр</MenuItem>
 </DropdownButton>
 */
