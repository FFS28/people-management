import React, { useState } from 'react'
import MapContext from './MapContext'

export const MapProvider = ({ children }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 51.917738, lng: 17.455256 })

  return (
    <MapContext.Provider value={{ mapCenter, setMapCenter }}>
      {children}
    </MapContext.Provider>
  )
}
