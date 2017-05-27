/* eslint jsx-a11y/href-no-hash:"off" */

import React from 'react';
import {FormControl} from 'react-bootstrap';
import {Link} from 'react-router';
import {routerContext as RouterType} from 'react-router/PropTypes';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';
import axios from 'axios';
import "../../css/Editor.scss";

import {loggedOut} from '../actions/actions';

const searchStyle = {
  paddingTop: "10px",
  color: "white"
};

class Navigation extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.context.router.transitionTo(`/find/${e.target.value}`);
    }
  }

  handleSignOut() {
    axios.post('/api/signout')
      .then(
        (/* success*/) => {
          this.props.onSignOut();
          this.context.router.transitionTo('/');
        },
        failure => console.error(`Failed to log out successfully: ${failure}`)
      );
  }

  adminMenu() {
    return this.props.auth.roles.some(r => r === 'ROLE_ADMIN')
      ? (<li className="dropdown">
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >Admin menu <span className="caret"/></a>
        <ul className="dropdown-menu">
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider"/>
          <li><a href="/settings/categories">Категории</a></li>
        </ul>
      </li>)
      : null;
  }

  userMenu() {
    return this.props.auth.roles.some(r => r === 'ROLE_ADMIN' || r === 'ROLE_USER')
      ? (<li className="dropdown">
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >{this.props.auth.userName} <span className="caret"/></a>
        <ul className="dropdown-menu">
          <li><Link to="/user">{this.props.auth.userName}</Link></li>
          <li role="separator" className="divider"/>
          <li><a href="/user/all">AllPosts</a></li>
        </ul>
      </li>)
      : null;
  }

  searchInput() {
    return (<li style={searchStyle}>
      <FormControl type="text" placeholder="Поиск" onKeyPress={(e) => this._handleKeyPress(e)}/>
    </li>);
  }

  authLink() {
    if (!this.props.auth.signedIn) {
      return <Link to="/signin">Sign In</Link>;
    }

    return (
      <div className="navbar-form" style={{paddingLeft: 0, paddingRight: 0}}>
        <button className="btn btn-link" onClick={() => this.handleSignOut()}>Sign Out</button>
      </div>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link to="/" className="navbar-brand">Easy electronics</Link>
          </div>
          <div id="navbar" className="collapse navbar-right navbar-collapse">
            <ul className="nav navbar-nav">
              {this.searchInput()}
              {this.adminMenu()}
              <li><Link to="/">Home</Link></li>
              {this.userMenu()}
              <li><Link to="/addArticle">Add Article</Link></li>
              <li>{this.authLink()}</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navigation.contextTypes = {
  router: RouterType.isRequired
};

Navigation.propTypes = {
  onSignOut: React.PropTypes.func,
  auth: React.PropTypes.object
};


/* Inject auth state and a dispatch() wrapper into props */
export default connect(
  state => ({auth: state.auth}),
  dispatch => ({onSignOut: () => dispatch(loggedOut())})
)(Navigation);
