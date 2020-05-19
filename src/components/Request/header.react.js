import React from 'react'
import SearchBox from './searchbox.react'
import logo from '../logo.svg'
import Navigation from '../Navigation'
// import Issues from '../Issues'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header-content">
        <Link to={ROUTES.LANDING}>
          <div id="app-info">
            <img id="app-logo" src={logo} alt="App Logo" />
            <div className="app-title">Weathered Strip</div>
          </div>
        </Link>
        <div className="search-nav">
          <SearchBox
            searchSubmit={this.props.searchSubmit}
            currentResults={this.props.currentResults}
          />
          {/* <Issues /> */}
          <Navigation />
        </div>
      </div>
    </header>
  )
}

export default Header
