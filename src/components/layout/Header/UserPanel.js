import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const UserPanel = () => (
  <div className="userPanelContainer">
    <Dropdown
      text='Username'
      icon='user'
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
        <Dropdown.Item icon='sign-out' text='Sign out' />
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

export default UserPanel;
