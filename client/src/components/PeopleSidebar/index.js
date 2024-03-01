import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import PeopleList from './PeopleList'

import { TextField } from '@mui/material'

const PeopleSidebar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const debounced = useDebouncedCallback((value) => {
    setSearchQuery(value)
  }, 500)

  return (
    <>
      {/* Search People */}
      <TextField
        label="Search People"
        variant="outlined"
        sx={{ width: 'calc(100% - 15px)' }}
        margin="normal"
        defaultValue=""
        size="small"
        onChange={(e) => debounced(e.target.value)}
      />

      {/* PeopleList */}
      <PeopleList filter={searchQuery} />
    </>
  )
}

export default PeopleSidebar
