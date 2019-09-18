import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { AppLayout } from './layouts';
import { routes } from './const';
import {
  HomePage,
  SignIn,
  SignUp,
  ForgotPassword,
  ResetPassword,
} from './containers';

export default () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.SIGN_UP} component={SignUp} />
        <Route exact path={routes.SIGN_IN} component={SignIn} />
        <Route exact path={routes.RESET_PASSWORD} component={ResetPassword} />
        <Route exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
      </Switch>
    </Router>
  </Provider>
);
