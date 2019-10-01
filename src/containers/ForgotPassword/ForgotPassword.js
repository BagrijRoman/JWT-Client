import React from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';

import { Form, Button, Icon } from 'semantic-ui-react';
import { FormBaseComponent } from '../../components';

import { apiService } from '../../services';
import { routes } from '../../const';
import { validateDataBySchema, notificator } from '../../utils';
import forgotPasswordValidationSchema from './validationSchema';

class ForgotPassword extends FormBaseComponent {
  static propTypes = {
    history: T.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      requestWasSent: false,
      loading: false,
      errors: {
        email: false,
      },
    };
  }

  onGetResetLinkClick = async () => {
    const {
      toggleLoading,
      setError,
      resetErrors,
      state: { email },
    } = this;
    toggleLoading(true);
    const { error } = validateDataBySchema({ email }, forgotPasswordValidationSchema);

    if (error) {
      setError(error);
    } else {
      resetErrors();
      const requestResult = await apiService.resetPasswordRequest({ email });
      const { error, errorKey } = requestResult;

      if (error && errorKey) {
        notificator.error(I18n.t(errorKey));
      }

      // is sucess - add notification about sended email and change ui somehow.
      // also add notification that token will expire in 15 min
    }

    toggleLoading(false);
  };

  onGoToSignInPageClick = () => this.props.history.push(routes.SIGN_IN);

  render() {
    const {
      onInputChange,
      onGoToSignInPageClick,
      onGetResetLinkClick,
      state: {
        email,
        loading,
        errors,
      },
    } = this;

    return(
      <div className="forgot-password-page sign-page">
        <div className="sign-container">
          <h3>{I18n.t('resetPassword')}</h3>
          <Form noValidate>
            <Form.Input
              {...{
                label: I18n.t('email'),
                type: 'email',
                placeholder: I18n.t('typeEmailHere'),
                value: email,
                onChange: onInputChange('email'),
                disabled: loading,
                error: errors.email,
              }}
            />
            <Button
              {...{
                primary: true,
                icon: true,
                labelPosition: 'left',
                className: 'sign-form-btn',
                loading,
                disabled: loading,
                onClick: onGetResetLinkClick,
              }}
            >
              <Icon name="repeat" />
              {I18n.t('getResetLink')}
            </Button>
            <Button
              {...{
                icon: true,
                labelPosition: 'left',
                className: 'sign-form-btn',
                disabled: loading,
                onClick: onGoToSignInPageClick,
              }}
            >
              <Icon name="chevron left" />
              {I18n.t('goBackToSignInPage')}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);
