import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUserAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import './nav.css'

import { AuthUserContext } from '../Session';

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes';

const MenuAuth = () => (
  <>
    <Link className="nav-button" to={ROUTES.ACCOUNT}>
      <FontAwesomeIcon icon={faUserAlt} className="nav-button-icon"/>
      My Account
    </Link>
    <SignOutButton className="nav-button" icon/>
  </>
)

const MenuNonAuth= () => (
  <Link className="nav-button" to={ROUTES.SIGN_IN}>
    <FontAwesomeIcon icon={faSignInAlt} className="nav-button-icon"/>
    Sign In
  </Link>
)

const Menu = ({authUser}) => (
  <div className="navigation">
    <div className="nav-arrow"/>
    <div className="nav-buttons">
      <AuthUserContext.Consumer>
        {authUser => authUser ? <MenuAuth /> : <MenuNonAuth />}
      </AuthUserContext.Consumer>
    </div>
  </div>
)

const Navigation = ({authUser}) => {
  const [showMenu, setShowMenu] = useState(false)

  const node = useRef();

  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      // outside click
      setShowMenu(false);
    }
    // nothing happens if clicked inside
  };
  
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);

    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={node} className="user-button">
      <FontAwesomeIcon icon={faUserCircle} className="user-icon" size="2x" onClick={() => setShowMenu(!showMenu)}/>
      {showMenu && <Menu />}
    </div>
  )
};
export default Navigation;