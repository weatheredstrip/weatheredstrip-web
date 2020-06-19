import React, { Component } from 'react'
import { 
  withRouter
} from 'react-router-dom'
import queryString from 'query-string'

import * as ROUTES from '../../constants/routes';
import Content from './content.react'
import Footer from './footer.react'
import Header from './header.react'
import { withFirebase } from '../Firebase';

import './Request.css'

const INITIAL_STATE = {
  data: null,
  stations: null,
  isLoading: true,
}

class Request extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  serverRequest = async (stations) => {
    if (process.env.NODE_ENV !== 'production') {
      this.props.firebase.doLocalHttpsCall('http://localhost:5001')
    }
    const stationRequest = this.props.firebase.doHttpsCall('stations')
    try {
      const result = await stationRequest({ stations: stations })
      this.setState({data: result.data})
    } catch (err) {
      // Getting the Error details.
      var code = err.code;
      var message = err.message;
      var details = err.details;
      console.err(code, message)
      console.err(details)
    }
  }

  getInfo = (stations, refresh = false) => {
    if (stations && (stations !== this.state.stations || refresh)) {
      const stationsArray = stations.split(/(\s|,)/)
      this.setState({
        stations: stationsArray
      })
      this.serverRequest(stationsArray.filter(item => item !== ' ' && item !== ','))
    } else if (!stations) {
      // if an empty searchbox is searched for.
      this.setState({
        stations: null,
      })
    } else {
      // The station has not changed, no update is to be done.
    }
  }

  componentDidMount() {
    const stations = queryString.parse(this.props.location.search).stations
    if (!this.state.stations && stations) {
      // first initialization with GET request
      this.getInfo(stations.toUpperCase())
    } else {
      // anything else.
      this.props.history.push(ROUTES.LANDING);
    }
  }

  render() {
    return (
      <>
        <Header
          searchSubmit={(stations, refresh) =>
            this.getInfo(stations, refresh)
          }
          currentResults={this.state.stations}
        />
        <Content data={this.state.data} search={this.state.stations}/>
        <Footer />
      </>
    )
  }
}

export default withRouter(withFirebase(Request))

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