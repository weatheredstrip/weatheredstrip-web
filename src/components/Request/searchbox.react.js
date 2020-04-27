import React, { Component } from 'react'
import { 
  withRouter
} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import queryString from 'query-string'

import LinkButton from './linkbutton.react'
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  loading: false,
}

class SearchBoxBase extends Component {
  constructor(props) {
    super(props)
    
    const initial_value = this.props.location.search ? queryString.parse(this.props.location.search).stations : ''
    this.state = { 
      ...INITIAL_STATE,
      value: initial_value
    }
  }

  //  Event handler for change in input.
  handleChange = (event) => {
    event.preventDefault()
    const input = event.target.value.toUpperCase()
    this.setState({ value: input })
  }

  //  Event handler for form submit
  handleSearchSubmit = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    const search = this.state.value.toUpperCase()
    this.props.searchSubmit(search, true)
  }

  /*  State based button text allowing the button to read refresh when the
      query is the same as the currently shown data. */
  getButtonText = () => {
    if (this.state.loading) {
      return <FontAwesomeIcon className="spinning" icon={faSyncAlt} />
    } else {
      if (this.state.value === this.props.currentResults) {
        return <FontAwesomeIcon icon={faSyncAlt} />
      } else {
        return <FontAwesomeIcon icon={faSearch} />
      }
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.loading ||
      (!this.props.currentResults && prevProps.currentResults)
    ) {
      /*  This is a little hack to make the state reset. Everytime a re-render
          is called after a click has been activated, the loading state will be cleared. */
      this.setState({
        loading: false,
      })
    }
  }

  render = () => {
    return (
      <form className="searchbox">
        <input
          className="searchbox-input"
          type="text"
          aria-label="search-input"
          placeholder="ICAO or IATA codes..."
          value={this.state.value}
          onChange={this.handleChange}
        ></input>
        <LinkButton
          className="searchbox-button"
          aria-label="search-button"
          to={{
            pathname: ROUTES.REQUEST,
            search: `?stations=${this.state.value}`,
          }}
          type="submit"
          onClick={this.handleSearchSubmit}
          disabled={this.state.value === '' ? true : false}
        >
          {this.getButtonText()}
        </LinkButton>
      </form>
    )
  }
}

const SearchBox = withRouter(SearchBoxBase)

export default SearchBox
export { SearchBoxBase }
