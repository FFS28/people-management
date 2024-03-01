import React from 'react'

import { Snackbar, Slide, Alert } from '@mui/material'

function SlideTransition(props) {
  return <Slide {...props} direction="up" />
}

export default function IESnackBar({ message, open, close, severity }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={close}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={close}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
