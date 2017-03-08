import React, {PropTypes} from "react";
import {connect} from "react-redux";
import { Row, Col, Jumbotron, Nav, NavItem} from 'react-bootstrap';

class Mode extends React.Component {
    handleSelect(eventKey) {
        event.preventDefault();
        alert(`selected ${eventKey}`);
    }

    render() {

        return (
            <Row>
                <Col md={10} mdOffset={4}>
                        <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                            <NavItem eventKey="1" href="/home">Редактирование</NavItem>
                            <NavItem eventKey="2" title="Item">Предпросмотр</NavItem>
                        </Nav>
                </Col>
            </Row>
        );
    }
}


Mode.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});


export default Mode;