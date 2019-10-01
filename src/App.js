import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './redux/store';
import { AppLayout, AuthLayout } from './components/layout';
import { CustomRoute } from './components/routes';
import { routes } from './const';
import { SplashScreenWrapper } from './components';
import {
  HomePage,
  SignIn,
  SignUp,
  ForgotPassword,
  ResetPassword,
  Profile,
} from './containers';

const App = () => (
  <Provider store={store}>
    <SplashScreenWrapper>
      <Router>
        <CustomRoute {...{ exact: true, path: routes.HOME, component: HomePage, layout: AppLayout, redirectTo: routes.SIGN_IN, authStatus: true }} />
        <CustomRoute {...{ exact: true, path: routes.PROFILE, component: Profile, layout: AppLayout, redirectTo: routes.SIGN_IN, authStatus: true }} />

        <CustomRoute {...{ exact: true, path: routes.SIGN_IN, component: SignIn, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
        <CustomRoute {...{ exact: true, path: routes.SIGN_UP, component: SignUp, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
        <CustomRoute {...{ exact: true, path: routes.RESET_PASSWORD, component: ResetPassword, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
        <CustomRoute {...{ exact: true, path: routes.FORGOT_PASSWORD, component: ForgotPassword, layout: AuthLayout, redirectTo: routes.HOME, authStatus: false }} />
      </Router>
    </SplashScreenWrapper>
    <ToastContainer/>
  </Provider>
);

export default App;
