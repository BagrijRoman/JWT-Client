import React, { Component } from 'react';
import T from 'prop-types';
import { Button, Icon } from 'semantic-ui-react'

const FormButtons = ({
                       loading,
                       onSignInClick,
                       onSignUpClick,
                     }) => (
  <>
    <Button
      {...{
        primary: true,
        icon: true,
        labelPosition: 'left',
        className: 'sign-form-btn',
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
        className: 'sign-form-btn',
        loading,
        disabled: loading,
        onClick: onSignInClick,
      }}
    >
      <Icon name="sign-in" />
      Sign in
    </Button>
  </>
);

FormButtons.propTypes = {
  loading: T.bool.isRequired,
  onSignInClick: T.func.isRequired,
  onSignUpClick: T.func.isRequired,
};

export default FormButtons;
