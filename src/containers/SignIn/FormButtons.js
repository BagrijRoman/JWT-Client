import React, { Component } from 'react';
import T from 'prop-types';
import { Button, Icon } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';

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
        className: 'sign-form-btn',
        loading,
        disabled: loading,
        onClick: onSignInClick,
      }}
    >
      <Icon name="sign-in" />
      {I18n.t('signIn')}
    </Button>
    <Button
      {...{
        icon: true,
        labelPosition: 'left',
        className: 'sign-form-btn',
        disabled: loading,
        onClick: onSignUpClick,
      }}
    >
      <Icon name="add user" />
      {I18n.t('signUp')}
    </Button>
    <Button
      {...{
        icon: true,
        labelPosition: 'left',
        className: 'sign-form-btn',
        disabled: loading,
        onClick: onForgotPasswordClick,
      }}
    >
      <Icon name="question" />
      {I18n.t('forgotPassword')}
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
