import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import PrintView from './printview.react'

function StationNav({ data, selected, onClick }) {
  const componentRef = useRef()
  if (data) {
    const stations = data
      .filter(station => station.name !== undefined)
      .map(airport => {
        const divClass =
          selected === airport.codes[1] ? 'station station-selected' : 'station'
        return (
          <button
            className={divClass}
            key={airport.codes[0]}
            onClick={() => onClick(airport.codes[1])}
          >
            {airport.codes[1]}
          </button>
        )
      })
    return (
      <div id="navbar">
        <div className="navbar-content">
          {stations}
          <ReactToPrint
            trigger={() => (
              <button className="button primary print-button" key="print">
                Print
              </button>
            )}
            content={() => componentRef.current}
            bodyClass="print-body"
            pageStyle=""
          />
        </div>
        <div style={{ display: 'none' }}>
          <PrintView data={data} ref={componentRef} />
        </div>
      </div>
    )
  } else {
    return <div id="navbar" />
  }
}

export default StationNav
