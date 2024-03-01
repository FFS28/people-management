import { useState, useEffect } from 'react'

const useLocationStorage = () => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('locations')) || []
    setLocations(storedLocations)
  }, [])

  const importLocations = (locationArray) => {
    const storedLocations = JSON.parse(localStorage.getItem('locations')) || []
    const updatedLocations = [...storedLocations, ...locationArray]
    localStorage.setItem('locations', JSON.stringify(updatedLocations))
    setLocations(updatedLocations)
  }

  const addLocation = (location) => {
    const updatedLocations = [...locations, location]
    localStorage.setItem('locations', JSON.stringify(updatedLocations))
    setLocations(updatedLocations)
  }

  const removeLocation = (id) => {
    const updatedLocations = locations.filter((location) => location.id !== id)
    localStorage.setItem('locations', JSON.stringify(updatedLocations))
    setLocations(updatedLocations)
  }

  const removeAllLocations = () => {
    localStorage.removeItem('locations') // Clear the locations from localStorage
    setLocations([]) // Reset the locations state to an empty array
  }

  return {
    locations,
    addLocation,
    importLocations,
    removeLocation,
    removeAllLocations,
  }
}

export default useLocationStorage
