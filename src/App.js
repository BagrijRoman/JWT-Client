import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { AppLayout, AuthLayout } from './components/layouts';
import { CustomRoute } from './components/routes';
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
      <CustomRoute {...{ exact: true, path: routes.HOME, component: HomePage, layout: AppLayout, redirectTo: routes.SIGN_IN, authStatus: true }} />
      <CustomRoute {...{ exact: true, path: routes.SIGN_IN, component: SignIn, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
      <CustomRoute {...{ exact: true, path: routes.SIGN_UP, component: SignUp, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
      <CustomRoute {...{ exact: true, path: routes.RESET_PASSWORD, component: ResetPassword, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
      <CustomRoute {...{ exact: true, path: routes.FORGOT_PASSWORD, component: ForgotPassword, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
    </Router>
  </Provider>
);
