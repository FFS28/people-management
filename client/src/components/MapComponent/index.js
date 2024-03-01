import React, { useContext, useState } from 'react'
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useLoadScript,
} from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'

import Toolbar from './ToolBar'
import Loading from '../Loading.js'
import MapContext from '../../contexts/MapContext.js'

import { addLocation } from '../../redux/locationSlice.js'

const mapStyles = {
  width: '100%',
  height: '100vh',
  position: 'relative',
}

const libraries = ['places']

const MapComponent = () => {
  const dispatch = useDispatch()
  const locations = useSelector((state) => state.locations)

  const { mapCenter, setMapCenter } = useContext(MapContext)

  const [mapRef, setMapRef] = useState(null)
  const [searchBox, setSearchBox] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps...'

  const onMapLoad = (map) => {
    setMapRef(map)
  }

  const onLoad = (ref) => {
    setSearchBox(ref)
  }

  const onPlacesChanged = () => {
    if (searchBox !== null) {
      const places = searchBox.getPlaces()
      const place = places[0]

      if (place && place.geometry) {
        mapRef.panTo(place.geometry.location)
        mapRef.setZoom(15) // Adjust the zoom level after selecting a place
      }
    }
  }

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setIsLoading(true)

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      )

      if (!response.ok) {
        throw new Error('Geocoding API request failed')
      }

      const data = await response.json()
      if (data.results.length === 0) {
        throw new Error('No results found for this location')
      }
      const locationName = data.results[1].formatted_address

      const newLocation = [
        {
          name: locationName,
          lat,
          lng,
          time: new Date().toISOString(),
        },
      ]

      dispatch(addLocation(newLocation))

      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching location details:', error)
      setIsLoading(false)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={mapCenter}
        zoom={10}
        onClick={isLoading ? null : handleMapClick} // Prevents map clicks when loading
        options={{
          draggableCursor: isLoading ? 'wait' : 'crosshair',
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onLoad={onMapLoad}
      >
        {locations.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setMapCenter({ lat: marker.lat, lng: marker.lng })
            }}
          />
        ))}
      </GoogleMap>

      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <Toolbar />
      </StandaloneSearchBox>

      <Loading isLoading={isLoading} />
    </div>
  )
}

export default MapComponent
