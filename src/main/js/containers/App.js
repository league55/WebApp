import React from 'react';
import {Match, Miss} from 'react-router';
import {Row, Col} from 'react-bootstrap';
import AppMeta from './AppMeta';
import SideMenu from '../components/SideMenu';

import MatchWhenAuthorized from './MatchWhenAuthorized';
import {
  LatestArticlesList, UsersArticlesList, Errors, Navigation,
  SignIn, Composer, Categories
} from '../components';

const App = () => (
  <div>
    <AppMeta />
    <Navigation />
    <Row>
      <Col md={2} xs={12}>
        <SideMenu />
      </Col>
      <Col md={9} xs={12}>
        <div className="container-fluid">
          <Match exactly pattern="/" component={LatestArticlesList}/>
          <Match pattern="/latest/:page" component={LatestArticlesList}/>
          <Match pattern="/category/:category/:page" component={LatestArticlesList}/>
          <Match pattern="/latest" component={LatestArticlesList}/>
          <MatchWhenAuthorized pattern="/addArticle" component={Composer}/>
          <MatchWhenAuthorized pattern="/user" component={LatestArticlesList}/>
          <MatchWhenAuthorized pattern="/user/all" component={UsersArticlesList}/>
          <MatchWhenAuthorized pattern="/settings/categories" component={Categories}/>
          <Match pattern="/signin" component={SignIn}/>
          <Miss component={Errors}/>
        </div>
      </Col>
    </Row>
  </div>
);

export default App;
