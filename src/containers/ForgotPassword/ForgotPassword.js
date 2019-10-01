import React, { Component } from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';

import { Form, Button, Icon } from 'semantic-ui-react';

import { routes } from '../../const';
import { notificator, validateDataBySchema } from '../../utils';
import forgotPasswordValidationSchema from './validationSchema';

class ForgotPassword extends Component {
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

  toggleLoading = (value) => {
    const { _isMounted } = this;

    if (_isMounted) {
      this.setState({ loading: value });
    }
  };

  onInputChange = (valueKey) => (e, data) => this.setState({ [valueKey]: data.value });

  setError = (error) => {
    const stateUpdates = { errors: {} };

    if (error) {
      const { message, key } =  error.details;
      Object.assign(stateUpdates, { errors: { [key]: message } });  // todo message should be trnaslated
      notificator.error(message); // todo message should be trnaslated
    }

    this.setState(stateUpdates);
  };

  resetErrors = () => this.setState({ errors: {} });

  onGetResetLinkClick = async () => {
    const {
      toggleLoading,
      setError,
      resetErrors,
    } = this;
    toggleLoading(true);
    const { error } = validateDataBySchema({ email, password }, forgotPasswordValidationSchema);

    if (error) {
      setError(error);
    } else {
      resetErrors();
      // const authResult = await authService.signIn({ email, password });

      // if (authResult.error) {
      //   setError(authResult);
      // }
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
