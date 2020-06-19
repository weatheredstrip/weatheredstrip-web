import React from 'react'
import moment from 'moment'

function Notams({ children, data, selectedType, onTypeSelection, dataLength }) {
  let notams
  const types = ['Aerodrome', 'Area', 'FIR', 'National', 'GPS']

  if (data) {
    notams = data.map((notam, index) => {
      const startValidity = new Date(notam.startValidity)
      const now = new Date()
      const isActive = now > startValidity
      return (
        <div className="notif-text" key={index}>
          <div className="notam-heading">
            {notam && notam.link ? (
              <div>
                <a href={notam.link} rel="noopener noreferrer" target="_blank">
                  <strong>{notam.title} - </strong>
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            ) : (
                <div className="notam-title">{notam.title}</div>
              )}
            <div
              className={
                "notam-effective-pill" + (isActive ? " notam-active" : " notam-waiting")
              }
            >
              <div className="notam-time" title="NOTAM Effective Start (UTC)">
                {moment(notam.startValidity).format("YYMMDDHHmm")}
              </div>
              <div className="notam-time notam-time-more" title="NOTAM Effective End (UTC)">
                {notam.endValidity === "PERM" || notam.endValidity === null ? "PERMANENT" : moment(notam.endValidity).format("YYMMDDHHmm")}
              </div>
              {notam.isEndEstimated && (
                <div
                  className="notam-time notam-time-more"
                  title="NOTAM Effective End is estimated"
                >
                  EST.
                </div>
              )}
            </div>
          </div>
          <div className="notam-text">{notam.notam}</div>
        </div>
      )
    })
  }

  const typesFormated = types.map((type, index) => {
    let className
    let isDisabled = false
    if (dataLength && !dataLength[type]) {
      isDisabled = true
    }
    if (selectedType) {
      if (type === selectedType) {
        className = 'button primary'
      } else {
        className = 'button secondary'
      }
    } else {
      if (index === 0) {
        className = 'button primary'
      } else {
        className = 'button secondary'
      }
    }

    return (
      <button
        disabled={isDisabled}
        className={className}
        onClick={() => onTypeSelection(type)}
        key={type}
      >
        {`${type} (${dataLength && dataLength[type] ? dataLength[type] : 0})`}
      </button>
    )
  })

  return (
    <div id="notams">
      <div id="notam-header">
        <div className="subtitle">NOTAM</div>
        <div className="button-selection">{typesFormated}</div>
      </div>
      <div className="notams-list">{notams}</div>
    </div>
  )
}

export default Notams
