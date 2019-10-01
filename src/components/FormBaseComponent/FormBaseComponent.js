import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';

import { notificator } from '../../utils';

class FormBaseComponent extends Component {
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleLoading = (value) => {
    const { _isMounted } = this;

    if (_isMounted) {
      this.setState({ loading: value });
    }
  };

  onInputChange = (valueKey) => (e, data) => {
    const { errors: stateErrors } = this.state;
    const errors = { ...stateErrors, [valueKey]: null };
    this.setState({ [valueKey]: data.value, errors });
  };

  setError = (error) => {
    const stateUpdates = { errors: {} };

    if (error) {
      const { message, key } =  error.details;
      Object.assign(stateUpdates, { errors: { [key]: I18n.t(message) } });
      notificator.error(I18n.t(message));
    }

    this.setState(stateUpdates);
  };

  resetErrors = () => this.setState({ errors: {} });
}

export default FormBaseComponent;
