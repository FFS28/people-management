import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Avatar,
  ListItemButton,
} from '@mui/material'
import { teal } from '@mui/material/colors'

import SocialDistanceIcon from '@mui/icons-material/SocialDistance'
import MapContext from '../../contexts/MapContext'

import { setStatus } from '../../redux/detailEditSlice'
import { deleteFriend } from '../../redux/personSlice'
import { removeLocation } from '../../redux/locationSlice'

const FriendItem = () => {
  // status - 'view' | 'edit' | 'add'
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.detailEditInfo)
  const friends = useSelector((state) => state.person.friends)
  const people = useSelector((state) => state.people.data)

  const { setMapCenter } = useContext(MapContext)

  const handleDeleteFriend = (id) => {
    if (status === 0) dispatch(setStatus(1)) // Enable `Save` Button to Set the Status `edit`
    dispatch(deleteFriend(id))
    dispatch(removeLocation(id))
  }

  if (friends.length > 0)
    return (
      <>
        {friends.map((friendId) => {
          const friend = people.find((person) => person.id === friendId)

          if (friend === undefined) return null

          const {
            coordinates: [lng, lat],
          } = friend.primaryLocation || { coordinates: [0, 0] }

          return (
            <ListItem
              key={friend.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteFriend(friend.id)}
                >
                  <SocialDistanceIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton onClick={() => setMapCenter({ lat, lng })}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: teal[300] }}>
                    {friend.forename.charAt(0) || 'A'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${friend.forename} ${friend.surname}`}
                  secondary={`${friend.dob}`}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </>
    )
}

export default FriendItem
