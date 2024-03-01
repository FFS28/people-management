import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IconButton, Typography } from '@mui/material'

import InputIcon from '@mui/icons-material/Input'
import OutputIcon from '@mui/icons-material/Output'

import HtmlTooltip from '../HTMLTooltip'
import IESnackBar from './IESnackBar'

import { addLocation } from '../../redux/locationSlice.js'

const ImportExportGEOs = () => {
  const dispatch = useDispatch()
  const locations = useSelector((state) => state.locations)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')

  const handleImport = (event) => {
    const files = event.target.files
    const validExtensions = ['.json', '.txt']

    for (const file of files) {
      if (validExtensions.includes(file.name.toLowerCase().substr(-5))) {
        console.log('Valid JSON file selected:', file.name)

        const fileReader = new FileReader()

        fileReader.readAsText(files[0], 'UTF-8')
        fileReader.onload = (e) => {
          try {
            const locations = JSON.parse(e.target.result)
            console.table(locations)
            dispatch(addLocation(locations)) // This should be a method that updates the state of the store

            setSeverity('success')
            setSnackbarMessage(`Locations imported from "${file.name}"`)
            setOpenSnackbar(true)
          } catch (error) {
            setSeverity('error')
            setSnackbarMessage(`Error importing locations: ${error}`)
            setOpenSnackbar(true)
          }
        }
      } else {
        // Invalid file type
        setSeverity('error')
        setSnackbarMessage(
          `"${
            file.name
          }" - Invalid file type. Please select [${validExtensions.join(
            ' | '
          )}] file.`
        )
        setOpenSnackbar(true)
      }
    }
  }

  const handleExport = () => {
    if (!!locations) {
      const fileName = 'locations.json'
      const json = JSON.stringify(locations)
      const blob = new Blob([json], { type: 'application/json' })
      const href = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = href
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      setSeverity('warning')
      setSnackbarMessage(`There's no selected location!`)
      setOpenSnackbar(true)
      return
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <>
      <input
        accept="application/json"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleImport}
      />
      <label htmlFor="raised-button-file">
        <HtmlTooltip
          placement="bottom"
          title={
            <>
              <Typography color="inherit">Import People Data</Typography>
              <b>{'with'}</b> <u>{'amazing GEOJson information'}</u>.{' '}
              {"It's very engaging. Right?"}
            </>
          }
        >
          <IconButton aria-label="import" component="span">
            <InputIcon />
          </IconButton>
        </HtmlTooltip>
      </label>

      <HtmlTooltip
        placement="bottom"
        title={
          <>
            <Typography color="inherit">Export People Data</Typography>
            <b>{'with'}</b> <u>{'amazing GEOJson information'}</u>.{' '}
            {"It's very engaging. Right?"}
          </>
        }
      >
        <IconButton aria-label="export" onClick={handleExport}>
          <OutputIcon />
        </IconButton>
      </HtmlTooltip>

      <IESnackBar
        message={snackbarMessage}
        open={openSnackbar}
        close={handleCloseSnackbar}
        severity={severity}
      />
    </>
  )
}

export default ImportExportGEOs
