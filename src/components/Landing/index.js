import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import './landing.css'

import Issues from '../Issues'

import * as ROUTES from '../../constants/routes'

import logo from '../logo.svg'

const LandingPage = () => {
  return (
    <>
      <Issues position="absolute" top="20px" right="20px"/>
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
