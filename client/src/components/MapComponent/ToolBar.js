import React from 'react'

import { TextField } from '@mui/material'

// import ImportExportGEOs from './ImportExportGEOs'

const ToolBar = () => {
  return (
    <>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 5 }}>
        <TextField label="Search Location" variant="filled" size="small" />
      </div>

      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 5 }}>
        {/* <ImportExportGEOs /> */}
      </div>
    </>
  )
}

export default ToolBar
