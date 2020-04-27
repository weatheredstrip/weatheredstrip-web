import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import PrintView from './printview.react'

function StationNav({ data, selected, onClick }) {
  const componentRef = useRef()
  if (data) {
    const stations = Object.keys(data)
      .filter(title => title !== 'other_notam' && title !== 'Timestamp')
      .map(airport => {
        const divClass =
          selected === airport ? 'station station-selected' : 'station'
        return (
          <button
            className={divClass}
            key={airport}
            onClick={() => onClick(airport)}
          >
            {airport}
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
