import React, { Component, useState } from 'react'
import { Alert, Pane } from 'evergreen-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import './landing.css'

import { AuthUserContext } from '../Session';

import Navigation from '../Navigation'

import * as ROUTES from '../../constants/routes'

import logo from '../logo.svg'

const NewAccountAlert = () => {
  const [display, setDisplay] = useState('flex')
  return (
    <AuthUserContext.Consumer>
      {authUser => !authUser && (
        <Pane
          position="absolute"
          top={20}
          right="50%"
          zIndex={1}
        >
          <Alert
            hasTrim={true}
            intent="none"
            position="relative"
            right="-50%"
            display={display}
            appearance="card"
            title="You can now create an account!"
            maxWidth={360}
            minWidth={200}
            hasIcon={false}
            isRemoveable={true}
            onRemove={() => setDisplay('none')}
          />
        </Pane>
      )}
    </AuthUserContext.Consumer>
)
}

const LandingPage = () => {
  return (
    <>
      <Navigation position="absolute" top="20px" right="20px" appearance="default"/>
      <NewAccountAlert />
      <div className="landing-page">
        <div className="landing-content">
          <div className="logo-title">
            <img className="landing-logo" src={logo} alt="App Logo" />
            <div className="landing-title">Weathered Strip</div>
          </div>
          <SearchForm />
        </div>
      </div>
    </>
  )
}

const INITIAL_STATE = {
  search: '',
}

class SearchFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    event.preventDefault()
    const { search } = this.state
    const request = {
      pathname: ROUTES.REQUEST,
      search: '?stations=' + search,
    }

    this.setState({ ...INITIAL_STATE })
    this.props.history.push(request)
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value.toUpperCase() })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="landing-search">
        <input
          className="landing-search-input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          name="search"
          placeholder="ICAO or IATA codes"
          value={this.state.search}
          onChange={this.onChange}
        />
        <button className="landing-search-button" type="submit">
          <FontAwesomeIcon
            className="landing-search-button-icon"
            icon={faSearch}
            size="2x"
            color="#282c34"
          />
        </button>
      </form>
    )
  }
}

const SearchForm = withRouter(SearchFormBase)

export default LandingPage
