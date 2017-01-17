import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
/*
Router is the object that 'decides' what components to show on the screen

browserHistory is the object that tells Router HOW to interpret changes to the URL; whenever the
URL updates, Router will interpret everything after the protocol. Using browserHistory requires
additional configuration on the server side to serve up URLs, which is partially found in

./routes.js

We can nest routes within other routes to define more complex URLs; whenever we expect a parent
route to render a child route, the parent needs to reference:

{this.props.children}

...in the render method, as that is where child components will be rendered.

If we were using hashHistory, Router would interpret everything after a hash (e.g.
http://www.blog.com/#posts/5)

There is a third option, memoryHistory, which doesn't use the URL at all.
*/
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import reducers from './reducers';


/* we want all of our actions to 'flow' through the redux-promise middleware BEFORE propagating to
all of our reducers, so we pass it in here: */
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
