import React from 'react';

import { withFirebase } from '../Firebase';
import { Menu } from 'evergreen-ui'

const SignOutButton = ({ firebase, className, icon }) => (
  <Menu.Item
    onSelect={firebase.doSignOut}
    icon="log-out"
  >
    Sign Out
  </Menu.Item>
);

export default withFirebase(SignOutButton);