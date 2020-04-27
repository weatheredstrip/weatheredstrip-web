import React, { Component } from 'react'
import { 
  withRouter
} from 'react-router-dom'
import queryString from 'query-string'
import * as ROUTES from '../../constants/routes';

import Content from './content.react'
import Footer from './footer.react'
import Header from './header.react'

import './Request.css'

const INITIAL_STATE = {
  data: null,
  stations: null,
}

class Request extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  serverRequest = (stations, callback) => {
    const data = null

    var xhr = new XMLHttpRequest()

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          callback(JSON.parse(this.responseText))
        } else {
          window.alert('The server is unreachable...')
        }
      }
    })

    if (process.env.NODE_ENV === 'production') {
      xhr.open('GET', `https://api.weatheredstrip.com/airport?q=${stations}`)
    } else if (process.env.NODE_ENV === 'development') {
      xhr.open('GET', `http://localhost:3001/airport?q=${stations}`)
    }

    xhr.send(data)
  }

  getInfo = (stations, refresh = false) => {
    if (stations && (stations !== this.state.stations || refresh)) {
      this.serverRequest(stations, res => {
        this.setState({
          data: res,
          stations: stations,
        })
      })
    } else if (!stations) {
      // if an empty searchbox is searched for.
      this.setState({
        stations: null,
      })
    } else {
      // The station has not changed, no update is to be done.
    }
  }

  render() {
    let rendered;
    const stations = queryString.parse(this.props.location.search).stations
    if (!this.state.stations && stations) {
      // first initialization with GET request
      this.getInfo(stations.toUpperCase())
      rendered = <Content data={this.state.data} />
    } else if (stations) {
      // GET Request after first initialization
      rendered = <Content data={this.state.data} />
    } else {
      // anything else.
      this.props.history.push(ROUTES.LANDING);
    }

    return (
      <>
        <Header
          searchSubmit={(stations, refresh) =>
            this.getInfo(stations, refresh)
          }
          currentResults={this.state.stations}
        />
        {rendered}
        <Footer />
      </>
    )
  }
}

export default withRouter(Request)

export { default as Content } from './content.react'
export { default as Footer } from './footer.react'
export { default as GFA } from './gfa.react'
export { default as Header } from './header.react'
export { default as Metars } from './metars.react'
export { default as Notams } from './notams.react'
export { default as PrintView } from './printview.react'
export { default as Rvr } from './rvr.react'
export { default as StationNav } from './stationNav.react'
export { default as Tafs } from './tafs.react'
export { default as Timestamp } from './timestamp.react'