import React from 'react';
import T from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import * as R from 'ramda';

import { ApiService } from '../../../services';
import { routes } from '../../../const';

const UserPanel = ({ userName, history }) => (
  <div className="user-panel-container">
    <Dropdown
      text={userName}
      icon='chevron down'
      floating
      labeled
      button
      className='icon'
    >
      <Dropdown.Menu>
        <Dropdown.Item icon='info' text={I18n.t('profile')} onClick={() => history.push(routes.PROFILE)} />
        <Dropdown.Item icon='envelope' text={I18n.t('inbox')} />
        <Dropdown.Item icon='settings' text={I18n.t('settings')} />
        <Dropdown.Divider />
        <Dropdown.Item icon='sign-out' text={I18n.t('signOut')} onClick={ApiService.signOut} />
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

UserPanel.propTypes = {
  userName: T.string.isRequired,
  history: T.object.isRequired,
};

const mapStateToProps = ({ accounts }) => ({ userName: R.pathOr(I18n.t('userName'), ['user', 'name'], accounts) });

export default R.compose(
  withRouter,
  connect(mapStateToProps, null),
)(UserPanel);
