import React from 'react';
import T from 'prop-types';
import { Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';

import { FormBaseComponent } from '../../components';
import FormButtons from './FormButtons';

import { routes } from '../../const';
import { ApiService } from '../../services';
import { validateDataBySchema } from '../../utils';
import signInValidationSchema from './validationSchema';

class SignIn extends FormBaseComponent {
  static propTypes = {
    history: T.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {
        email: false,
        passowrd: false,
      },
    };
  }

  onSignInClick = async () => {
    const {
      toggleLoading,
      setError,
      resetErrors,
      state: { email, password },
    } = this;
    toggleLoading(true);

    const { error, key, message } = validateDataBySchema({ email, password }, signInValidationSchema);

    if (error) {
      setError({ key, message });
    } else {
      resetErrors();
      const { error, dataKey, msgKey } = await ApiService.signIn({ email, password });

      if (error) {
        setError({ key: dataKey, message: msgKey });
      }
    }

    toggleLoading(false);
  };

  onSignUpClick = () => this.props.history.push(routes.SIGN_UP);

  onForgotPasswordClick = () => this.props.history.push(routes.FORGOT_PASSWORD);

  render () {
    const {
      onSignInClick,
      onSignUpClick,
      onForgotPasswordClick,
      onInputChange,
      state: {
        email,
        password,
        loading,
        errors,
      }
    } = this;

    return (
      <div className="sign-page">
        <div className="sign-container">
          <h3>{I18n.t('signInHeader')}</h3>
          <Form>
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
            <Form.Input
              {...{
                label: I18n.t('password'),
                type: 'password',
                placeholder: I18n.t('typePasswordHere'),
                value: password,
                onChange: onInputChange('password'),
                disabled: loading,
                error: errors.password,
              }}
            />
          </Form>
          <FormButtons
            {...{
              loading,
              onSignInClick,
              onSignUpClick,
              onForgotPasswordClick,
            }}
          />
        </div>
      </div>
    );
  };
}

export default withRouter(SignIn);
