import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heading, ErrorIcon, IconButton, Menu, Pane, SideSheet, Text, Pill} from 'evergreen-ui'
import './nav.css'

import { AuthUserContext } from '../Session';
import SignInMenu from '../SignIn'

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes';

const IssuesContext = React.createContext({ numIssues: 0 });

const MenuAuth = ({onSelection}) => (
    <>
      <Menu.Item icon="user" to={ROUTES.ACCOUNT} is={Link} onSelect={onSelection}>
        Account
      </Menu.Item>
      <SignOutButton />
    </>
  )

const MenuNonAuth= () => (
  <SignInMenu />
)

const MenuIssues = ({onSelection}) => {
  const { numIssues } = useContext(IssuesContext)
  return (
    <>
      {numIssues > 0 && (
          <Menu.Item
            icon="warning-sign"
            is='a'
            href="https://github.com/Greg-Hamel/weatheredstrip/issues?q=is%3Aissue+is%3Aopen+label%3A%22service+issue%22"
            target="_blank"
            onSelect={onSelection}
            display="flex"
            alignItems="center"
          >
            Issues
            <Pill margin={8} color="orange" isSolid>{numIssues}</Pill>
          </Menu.Item>
      )}
    </>
  )


}

const UserMenu = ({onSelection}) => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Pane height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <Menu>
          <Menu.Group>
            <Heading 
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {authUser ? authUser.username : "Anonymous"}
            </Heading>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item icon="search" to={ROUTES.LANDING} is={Link} onSelect={onSelection}>
              Search
            </Menu.Item>
            <MenuIssues onSelection={onSelection}/>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            {authUser ? <MenuAuth onSelection={onSelection}/> : <MenuNonAuth onSelection={onSelection}/>}
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item
              icon="code"
              is='a'
              href="https://devblog.weatheredstrip.com"
              target="_blank"
              onSelect={onSelection}
            >
              DevBlog
            </Menu.Item>  
          </Menu.Group>
        </Menu>
        <Pane display="flex" flexDirection="column" alignItems="center">
          <Text size={300}>Privacy Policy</Text>
          <Text size={300}>Terms of Service</Text> 
        </Pane>
      </Pane>
    )}
  </AuthUserContext.Consumer>
)

const Navigation = ({
  position,
  top,
  right,
  bottom,
  left,
  appearance,
}) => {
  const [navShown, setNavShown] = useState(false)
  const [numIssues, setNumIssues] = useState(null)

  if (numIssues === null) {
    fetch('https://us-central1-weatheredstrip.cloudfunctions.net/queryIssues')
      .then(response => {
        return response.json()
      })
      .then(result => setNumIssues(result.length))
      .catch(error => console.log('error', error))
  }

  return (
    <IssuesContext.Provider value={{ numIssues: numIssues }}>
      <SideSheet
          isShown={navShown}
          onCloseComplete={() => setNavShown(false)}
          width={150}
          display="flex"
        >
          {({close}) => (<UserMenu onSelection={close}/>)}
      </SideSheet>
      <Pane
        position={position}
        right={right}
        top={top}
        left={left}
        bottom={bottom}
      >
        <IconButton 
          onClick={() => setNavShown(true)}
          appearance={appearance || "minimal"}
          icon="menu"
          iconSize={24}
        />
        {numIssues > 0 && (
          <ErrorIcon icon="error" color="orange" elevation={1} className="nav-button-notif" />
        )}
        
      </Pane>
      

    </IssuesContext.Provider>
  )
};
export default Navigation;