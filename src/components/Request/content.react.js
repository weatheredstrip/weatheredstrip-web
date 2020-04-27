import React, { Component } from 'react'
import GFA from './gfa.react'
import StationNav from './stationNav.react'
import Metars from './metars.react'
import Tafs from './tafs.react'
import Notams from './notams.react'
import Rvr from './rvr.react'
import Timestamp from './timestamp.react'

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stationSelection: null,
      notamType: 'Aerodrome',
    }
  }

  onNotamTypeSelection = type => {
    this.setState({ ...this.state, notamType: type })
  }

  handleStationSelect = value => {
    this.setState({ ...this.state, stationSelection: value })
  }

  errorExists = () => {
    const { data } = this.props

    if (data[this.state.stationSelection]) {
      return data[this.state.stationSelection].ERROR ? true : false
    } else {
      return false
    }
  }

  componentDidUpdate() {
    const { data } = this.props
    if (data) {
      const airports = Object.keys(data)
      if (airports.indexOf(this.state.stationSelection) < 0) {
        this.setState({
          stationSelection: airports[0],
        })
      }
    }
  }

  render() {
    const { data } = this.props

    let content
    let selectedData = null
    let lengths = null

    if (data && data[this.state.stationSelection]) {
      const selected = this.state.stationSelection
      const stationData = data[selected]
      if (stationData.notam_EN) {
        const stationAerodrome = stationData.notam_EN.filter(
          notam => notam.type === 'aerodrome',
        )
        const stationFIR = stationData.notam_EN.filter(
          notam => notam.type === 'FIR',
        )
        const stationArea = stationData.notam_EN.filter(
          notam => notam.type === 'area',
        )
        const stationNational = stationData.notam_EN.filter(
          notam => notam.type === 'national',
        )
        lengths = {
          Aerodrome: stationAerodrome ? stationAerodrome.length : null,
          Area: stationArea ? stationArea.length : null,
          FIR: stationFIR ? stationFIR.length : null,
          GPS: data['other_notam'].KGPS.length,
          National: stationNational ? stationNational.length : null,
        }

        switch (this.state.notamType) {
          case 'GPS':
            selectedData = data['other_notam'].KGPS
            break
          case 'FIR':
            selectedData = stationFIR
            break
          case 'Aerodrome':
            selectedData = stationAerodrome
            break
          case 'Area':
            selectedData = stationArea
            break
          case 'National':
            selectedData = stationNational
            break
          default:
            selectedData = data['other_notam'].KGPS
        }
      }

      content = (
        <div className="content">
          <StationNav
            data={data}
            selected={selected}
            onClick={this.handleStationSelect}
          />
          <div className="user-content">
            {this.errorExists() ? (
              <>
                <div className="content-header">
                  <div className="station-name">
                    Error...
                  </div>
                </div>
                <div className="selected-content">
                  <div id="notams">
                    <div id="notam-header">
                      <div className="subtitle">This ICAO identifier does not seem to be valid or is not recognized by the server.</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="content-header">
                  <div className="station-name">
                    {data[selected].name.length > 40
                      ? data[selected].name.substring(0, 41) + '...'
                      : data[selected].name}
                  </div>
                  <Timestamp dataTime={data.Timestamp} />
                </div>
                <div className="selected-content">
                  <div className="metar-rvr">
                    <GFA data={data[selected]} />
                    <Rvr data={data[selected].rvr} />
                    <div className="col">
                      <div>
                        <div className="subtitle">METAR</div>
                        <Metars data={data[selected].metar} />
                      </div>
                      <div>
                        <div className="subtitle">TAF</div>
                        <Tafs data={data[selected].taf} />
                      </div>
                    </div>
                  </div>
                  <Notams
                    onTypeSelection={this.onNotamTypeSelection}
                    selectedType={this.state.notamType}
                    dataLength={lengths}
                    data={selectedData}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )
    } else {
      content = (
        <div className="content">
          <div className="user-content margin-6225">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )
    }
    return content
  }
}

export default Content
