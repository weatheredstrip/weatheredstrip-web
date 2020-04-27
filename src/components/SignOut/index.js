import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase, className, icon }) => (
  <div 
    onClick={firebase.doSignOut}
    className={className ? className : null}
    >
    {icon && <FontAwesomeIcon icon={faSignOutAlt} className={className ? className + "-icon" : null}/>}
    Sign Out
  </div>
);

export default withFirebase(SignOutButton);