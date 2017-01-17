import React from 'react';
/*
Route object: used to define a match between a URL and a component. Whenever the user is at the
specified path, render the specified component:

<Route path="/" component={App} />

IndexRoute object: a helper that behaves like a route but it'll be shown whenever the URL matches
up with a path defined by the parent, not the child
*/
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts-index';
import PostsNew from './components/posts-new';


export default (
  /* if the route is "/", show App && PostsIndex */
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
  </Route>
);
