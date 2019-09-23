import React, { Component } from 'react';
import T from 'prop-types';
import { Button, Icon } from 'semantic-ui-react'

const FormButtons = ({
                       loading,
                       onSignInClick,
                       onSignUpClick,
                       onForgotPasswordClick,
                     }) => (
  <>
    <Button
      {...{
        icon: true,
        labelPosition: 'left',
        primary: true,
        className: 'sign-in-form-btn',
        loading,
        disabled: loading,
        onClick: onSignInClick,
      }}
    >
      <Icon name="sign-in" />
      Sign in
    </Button>
    <Button
      {...{
        icon: true,
        labelPosition: 'left',
        className: 'sign-in-form-btn',
        disabled: loading,
        onClick: onSignUpClick,
      }}
    >
      <Icon name="add user" />
      Sign up
    </Button>
    <Button
      {...{
        icon: true,
        labelPosition: 'left',
        className: 'sign-in-form-btn',
        disabled: loading,
        onClick: onForgotPasswordClick,
      }}
    >
      <Icon name="question" />
      Forgot password
    </Button>
  </>
);

FormButtons.propTypes = {
  loading: T.bool.isRequired,
  onSignInClick: T.func.isRequired,
  onSignUpClick: T.func.isRequired,
  onForgotPasswordClick: T.func.isRequired,
};

export default FormButtons;
