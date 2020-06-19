import React, { useState } from 'react'

const GFA = ({ data }) => {
  const [typeGFA, setType] = useState('CLDWX')
  const [currentGFA, setCurrentGFA] = useState(0)

  if (data.gfa) {
    const gfas = data.gfa.filter(singleGFA => singleGFA.type === typeGFA)

    const gfaLinks = gfas.map(gfa => gfa.imageURL)

    const gfatimes = gfas.map((gfa, index) => {
      const time = new Date(Date.parse(gfa.sv + 'Z'))
      const hours =
        String(time.getUTCHours()).length < 2
          ? '0' + String(time.getUTCHours())
          : time.getUTCHours()

      const minutes =
        String(time.getUTCMinutes()).length < 2
          ? '0' + String(time.getUTCMinutes())
          : time.getUTCMinutes()

      const className = index === currentGFA ? 'primary' : 'secondary'

      return (
        <button
          key={gfa.sv}
          className={'button ' + className}
          onClick={() => {
            setCurrentGFA(index)
          }}
        >
          {time.getUTCDate() + 'T' + hours + minutes + 'Z'}
        </button>
      )
    })

    const gfa_array = gfaLinks.map((link, index) => {
      return (
        <img
          key={gfas[index].imageURL}
          className={'gfa-img' + (index !== currentGFA ? ' hidden' : '')}
          src={link}
          alt="Graphical Area Forecast"
        />
      )
    })

    return (
      <>
        <div className="subtitle">
          GFA
          <div className="linked-buttons">
            <button
              onClick={() => {
                setType('CLDWX')
              }}
              className={
                'linked-button ' +
                (typeGFA === 'CLDWX' ? 'primary' : 'secondary')
              }
            >
              Cloud
            </button>
            <button
              onClick={() => {
                setType('TURBC')
              }}
              className={
                'linked-button ' +
                (typeGFA === 'TURBC' ? 'primary' : 'secondary')
              }
            >
              Icing
            </button>
          </div>
        </div>
        <div id="gfa">
          {gfa_array}
          <div className="gfa-buttons">{gfatimes}</div>
        </div>
      </>
    )
  }
  return null
}

export default GFA
