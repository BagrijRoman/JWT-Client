import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../../const';

const SignInSignUpPanel = () => (
  <div className="sign-up-in-panel">
    <div className="header-button">
      <i className="fa fa-user-plus" />
      <Link to={routes.SIGN_UP}>Sign up</Link>
    </div>
    <div className="header-button">
      <i className="fa fa-sign-in" />
      <Link to={routes.SIGN_IN} >Sign in</Link>
    </div>
  </div>
);

export default SignInSignUpPanel;
