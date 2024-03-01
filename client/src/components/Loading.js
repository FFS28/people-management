import React from 'react'

import { CircularProgress } from '@mui/material'

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  cursor: 'wait',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkened background
  zIndex: 2, // Ensures the overlay is above the map
}

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <>
          <div style={overlayStyle} />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3, // Ensure the loading indicator is above the map
            }}
          >
            <CircularProgress color="primary" size={80} thickness={8} />
          </div>
        </>
      )}
    </>
  )
}

export default Loading
