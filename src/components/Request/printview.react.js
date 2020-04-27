import React from 'react'
import Metars from './metars.react'
import Tafs from './tafs.react'

const renderNotam = (notams, type) => {
  if (notams) {
    const typed = notams.filter(notam => notam.type === type)
    if (typed.length === 0) {
      return null
    } else {
      return typed.map((notam, index) => {
        return (
          <div className="notif-text" key={index}>
            {notam && notam.link ? (
              <div>
                <a href={notam.link} rel="noopener noreferrer" target="_blank">
                  <strong>{notam.title} - </strong>
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            ) : (
              <div>
                <strong>{notam.title}</strong>
              </div>
            )}
            <div>{notam.notam}</div>
          </div>
        )
      })
    }
  }
}

const renderGpsNotams = notams => {
  const notam = notams['KGPS']
  if (notam[0]) {
    return (
      <div className="notif-text">
        <div>
          <strong>{notams['KGPS'][0].title}</strong>
        </div>
        <div>{notams['KGPS'][0].notam}</div>
      </div>
    )
  } else {
    return null
  }
}

class PrintView extends React.Component {
  /* this is the function used by react-to-print to represent the data
  during printing operation. */
  render() {
    // if data contains more than just the other_notams
    const content =
      Object.keys(this.props.data).length > 1 ? this.props.data : []
    let contentArray

    if (content) {
      const gpsNotams = renderGpsNotams(content['other_notam']) || (
        <div className="notif-text">No GPS NOTAM at this time.</div>
      )

      contentArray = Object.keys(content).map(station => {
        const stationData = content[station]

        if (station !== 'other_notam' && station !== 'Timestamp') {
          const aerodromeNotams = renderNotam(
            stationData.notam_EN,
            'aerodrome',
          ) || (
            <div className="notif-text">
              No Aerodrome NOTAM found for this station
            </div>
          )
          const areaNotams = renderNotam(stationData.notam_EN, 'area') || (
            <div className="notif-text">
              No Area NOTAM found for this station
            </div>
          )
          const FIRNotams = renderNotam(stationData.notam_EN, 'FIR') || (
            <div className="notif-text">No NOTAM for {stationData.FIR}.</div>
          )
          const nationalNotams = renderNotam(
            stationData.notam_EN,
            'national',
          ) || <div className="notif-text">No National NOTAM at this time.</div>
          return (
            <div key={stationData.icao_code} className="print-station">
              <div className="station-name">{stationData.name}</div>
              <div className="subtitle">METAR</div>
              <Metars data={stationData.metar} />
              <div className="subtitle">TAF</div>
              <Tafs data={stationData.taf} />
              <div className="subtitle">NOTAM</div>
              <div className="notam-type">Aerodrome</div>
              <div>{aerodromeNotams}</div>
              <div className="notam-type">Area</div>
              <div>{areaNotams}</div>
              <div className="notam-type">FIR</div>
              <div>{FIRNotams}</div>
              <div className="notam-type">National</div>
              <div>{nationalNotams}</div>
              <div className="notam-type">GPS</div>
              <div>{gpsNotams}</div>
            </div>
          )
        } else {
          return null
        }
      })
    } else {
      return (
        <div>
          No content specified. Ensure a search was done before printing.
        </div>
      )
    }

    return <div>{contentArray}</div>
  }
}

export default PrintView
