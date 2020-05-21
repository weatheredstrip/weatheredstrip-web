import React from 'react'
import SearchBox from './searchbox.react'
import logo from '../logo.svg'
import Navigation from '../Navigation'
import { Link } from 'react-router-dom'
import { Pane } from 'evergreen-ui'

import * as ROUTES from '../../constants/routes'

const Header = (props) => {
  return (
    <header className="app-header">
      <div className="app-header-content">
        <Link to={ROUTES.LANDING}>
          <div id="app-info">
            <img id="app-logo" src={logo} alt="App Logo" />
            <div className="app-title">Weathered Strip</div>
          </div>
        </Link>
        <Pane className="search-nav">
          <SearchBox
            searchSubmit={props.searchSubmit}
            currentResults={props.currentResults}
          />
          <Navigation position="relative"/>
        </Pane>
      </div>
    </header>
  )
}

export default Header
