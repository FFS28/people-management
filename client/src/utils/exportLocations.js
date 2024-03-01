const exportLocations = (locations) => {
  // Export saved locations info as JSON data
  const fileName = 'locations_export.json'
  const json = JSON.stringify(locations)
  const blob = new Blob([json], { type: 'application/json' })
  const href = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = href
  link.download = fileName

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default exportLocations
