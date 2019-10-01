import React from 'react';
import T from 'prop-types';
import { Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';

import { FormBaseComponent } from '../../components';
import FormButtons from './FormButtons';

import { authService } from '../../services';
import { routes } from '../../const';
import { validateDataBySchema } from '../../utils';
import signUpValidationSchema from './validationSchema';

class SignUp extends FormBaseComponent {
  static propTypes = {
    history: T.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      loading: false,
      errors: {
        name: false,
        email: false,
        passowrd: false,
        rePassword: false,
      },
    };
  }

  onSignUpClick = async () => {
    const {
      state: {
        name,
        email,
        password,
        rePassword,
      },
      toggleLoading,
      setError,
      resetErrors,
    } = this;
    toggleLoading(true);
    const data = { name, email, password, rePassword };
    const { error } = validateDataBySchema(data, signUpValidationSchema);

    if (error) {
      setError(error);
    } else {
      resetErrors();
      const signUpResult = await authService.signUp(data);

      if (signUpResult.error) {
        setError(signUpResult);
      }
    }

    toggleLoading(false);
  };

  onSignInClick = () => this.props.history.push(routes.SIGN_IN);

  render () {
    const {
      onSignUpClick,
      onSignInClick,
      onInputChange,
      state: {
        name,
        email,
        password,
        rePassword,
        loading,
        errors,
      }
    } = this;

    return (
      <div className="sign-page">
        <div className="sign-container">
          <h3>{I18n.t('signUpHeader')}</h3>
          <Form>
            <Form.Input
              {...{
                label: I18n.t('name'),
                type: 'text',
                placeholder: I18n.t('typeNameHere'),
                value: name,
                onChange: onInputChange('name'),
                disabled: loading,
                error: errors.name,
              }}
            />
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
            <Form.Input
              {...{
                label: I18n.t('confirmPassword'),
                type: 'password',
                placeholder: I18n.t('confirmPasswordHere'),
                value: rePassword,
                onChange: onInputChange('rePassword'),
                disabled: loading,
                error: errors.rePassword,
              }}
            />
          </Form>

          <FormButtons
            {...{
              loading,
              onSignInClick,
              onSignUpClick,
            }}
          />
        </div>
      </div>
    );
  };
}

export default withRouter(SignUp);
