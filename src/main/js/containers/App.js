import React from 'react';
import { Match, Miss } from 'react-router';
import AppMeta from './AppMeta';

import MatchWhenAuthorized from './MatchWhenAuthorized';
import { AddComment, CommentList, Errors, Navigation, SignIn, Composer } from '../components';

const App = () => (
  <div>
    <AppMeta />
    <Navigation />

    <div className="container">
      <Match exactly pattern="/" component={CommentList} />
      <MatchWhenAuthorized pattern="/add" component={AddComment} />
      <MatchWhenAuthorized pattern="/addArticle" component={Composer} />
      <MatchWhenAuthorized pattern="/user" component={CommentList} />
      <MatchWhenAuthorized pattern="/user/all" component={CommentList} />
      <Match pattern="/signin" component={SignIn} />
      <Miss component={Errors} />
    </div>
  </div>
);

export default App;
