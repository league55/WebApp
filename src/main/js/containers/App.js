import React from 'react';
import { Match, Miss } from 'react-router';
import AppMeta from './AppMeta';

import MatchWhenAuthorized from './MatchWhenAuthorized';
import { AddComment, LatestArticlesList, UsersArticlesList, Errors, Navigation,
    SignIn, Composer, Categories } from '../components';

const App = () => (
  <div>
    <AppMeta />
    <Navigation />

    <div className="container">
      <Match exactly pattern="/" component={LatestArticlesList} />
      <Match pattern="/latest/:page" component={LatestArticlesList} />
      <Match pattern="/latest" component={LatestArticlesList} />
      <MatchWhenAuthorized pattern="/add" component={AddComment} />
      <MatchWhenAuthorized pattern="/addArticle" component={Composer} />
      <MatchWhenAuthorized pattern="/user" component={LatestArticlesList} />
      <MatchWhenAuthorized pattern="/user/all" component={UsersArticlesList} />
      <MatchWhenAuthorized pattern="/settings/categories" component={Categories} />
      <Match pattern="/signin" component={SignIn} />
      <Miss component={Errors} />
    </div>
  </div>
);

export default App;
