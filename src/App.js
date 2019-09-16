import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { ProtectedRoute } from './components';
import { AppLayout } from './layouts';
// import { routes } from './const';

const routes = { HOME: '/' };

export default () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={routes.HOME} component={() => <h3>Home page will be here</h3>} />
      </Switch>
    </Router>
  </Provider>
);