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
  if (notams !== null) {
    return (
      notams.map(notam => (
        <div className="notif-text" key={notam.title}>
          <div>
            <strong>{notam.title}</strong>
          </div>
          <div>{notam.notam}</div>
        </div>
      ))
    )
  } else {
    return null
  }
}

const renderFIRNotams = notams => {
  if (notams !== null) {
    return notams.map(notam => {
      return (
        <div className="notif-text" key={notam.title}>
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

class PrintView extends React.Component {
  /* this is the function used by react-to-print to represent the data
  during printing operation. */
  render() {
    const { data } = this.props

    let contentArray
    // since KGPS is always searched, length always >= 1
    if (data && data.length > 1) { 
      contentArray = data.map(stationData => {
        if (stationData.type !== 'FIR' && stationData.type !== "other") {
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
          const FIRNotams = stationData.iso_country === "CA" ? (
            renderNotam(stationData.notam_EN, 'FIR') || (
              <div className="notif-text">No NOTAM for {stationData.FIR}.</div>
            )
          ) : (
            renderFIRNotams(data.filter(firStation => firStation.codes[0] === stationData.FIR)[0].notam_EN) || (
              <div className="notif-text">No NOTAM for {stationData.FIR}.</div>
            )
          ) 
          const nationalNotams = renderNotam(
            stationData.notam_EN,
            'national',
          ) || <div className="notif-text">No National NOTAM at this time.</div>
          return (
            <div key={stationData.codes[0]} className="print-station">
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
            </div>
          )
        } else if (
          stationData.type === "other" && 
          stationData.codes.indexOf("KGPS") >= 0
        ) { 
          const gpsNotams = renderGpsNotams(stationData.notam_EN) || (
            <div className="notif-text">No GPS NOTAM at this time.</div>
          )
          return (
            <div key={stationData.codes[0]} className="print-station">
              <div className="station-name">{stationData.codes[0]}</div>
              <div className="subtitle">NOTAM</div>
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
