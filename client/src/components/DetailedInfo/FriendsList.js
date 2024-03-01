import React from 'react'

import { List, Box } from '@mui/material'

import FriendItem from './FriendItem'

const FriendsList = () => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <List dense>
        <FriendItem />
      </List>
    </Box>
  )
}

export default FriendsList
