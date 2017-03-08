import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Header from "./Header.jsx";
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'


class Page extends React.Component {

    render() {

        return (
            <div className="container">
                <Header/>
                {this.props.children}
            </div>

        );
    }
}


Page.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});


export default Page;