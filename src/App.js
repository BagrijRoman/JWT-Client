import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './redux/store';
import { AppLayout, AuthLayout } from './components/layout';
import { CustomRoute } from './components/routes';
import { routes } from './const';
import {
  HomePage,
  SignIn,
  SignUp,
  ForgotPassword,
  ResetPassword,
  SplashScreen
} from './containers';

export default () => (
  <Provider store={store}>
    <SplashScreen>
      <Router>
        <CustomRoute {...{ exact: true, path: routes.HOME, component: HomePage, layout: AppLayout, redirectTo: routes.SIGN_IN, authStatus: true }} />
        <CustomRoute {...{ exact: true, path: routes.SIGN_IN, component: SignIn, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
        <CustomRoute {...{ exact: true, path: routes.SIGN_UP, component: SignUp, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
        <CustomRoute {...{ exact: true, path: routes.RESET_PASSWORD, component: ResetPassword, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
        <CustomRoute {...{ exact: true, path: routes.FORGOT_PASSWORD, component: ForgotPassword, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
      </Router>
    </SplashScreen>
    <ToastContainer/>
  </Provider>
);
