import React from 'react';
import T from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux'
import * as R from 'ramda';

import { authService } from '../../../services';

const UserPanel = ({ userName }) => (
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
        <Dropdown.Item icon='info' text='Profile' />
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
};

const mapStateToProps = ({ accounts }) => ({ userName: R.pathOr('user name' /*todo translate here*/, ['user', 'name'], accounts) });

export default connect(mapStateToProps, null)(UserPanel);
