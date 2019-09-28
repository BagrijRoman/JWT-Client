import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import * as R from 'ramda';

import { authService } from '../../../services';
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
        <Dropdown.Item icon='info' text='Profile' onClick={() => history.push(routes.PROFILE)} />
        <Dropdown.Item icon='envelope' text='Inbox' />
        <Dropdown.Item icon='settings' text='Settings' />
        <Dropdown.Divider />
        <Dropdown.Item icon='sign-out' text='Sign out' onClick={authService.signOut} />
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

UserPanel.propTypes = {
  userName: T.string.isRequired,
  history: T.object.isRequired,
};

const mapStateToProps = ({ accounts }) => ({ userName: R.pathOr('user name' /*todo translate here*/, ['user', 'name'], accounts) });

export default R.compose(
  withRouter,
  connect(mapStateToProps, null),
)(UserPanel);
