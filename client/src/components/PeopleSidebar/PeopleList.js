import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Box, Typography, Alert } from '@mui/material'

import ListShow from './ListShow.js'

import { apiFetchPeople } from '../../redux/peopleSlice.js'
import { setStatus } from '../../redux/detailEditSlice.js'
import { deSelectPerson } from '../../redux/personSlice.js'
import { removeAllLocations } from '../../redux/locationSlice.js'

const PeopleList = ({ filter }) => {
  const dispatch = useDispatch()
  const { data, error } = useSelector((state) => state.people)

  useEffect(() => {
    dispatch(apiFetchPeople())
  }, [dispatch])

  return (
    <Box sx={{ width: '100%' }}>
      {!!error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: '15px',
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(setStatus(2))
                dispatch(deSelectPerson())
                dispatch(removeAllLocations())
              }}
            >
              Add Person
            </Button>
            <Typography variant="subtitle1">
              <b>Total People: {data.length}</b>
            </Typography>
          </Box>

          <Box sx={{ width: '100%', maxHeight: '100vh' }}>
            <Box
              sx={{
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 110px)',
                paddingRight: '15px',
              }}
            >
              <ListShow filter={filter} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default PeopleList
