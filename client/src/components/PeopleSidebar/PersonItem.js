import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemButton,
  Avatar,
} from '@mui/material'

import { blue, purple } from '@mui/material/colors'

import MapContext from '../../contexts/MapContext.js'

import DeleteIcon from '@mui/icons-material/Delete'

import { removePerson } from '../../redux/peopleSlice.js'
import { deSelectPerson, selectPerson } from '../../redux/personSlice.js'
import { addLocation } from '../../redux/locationSlice.js'
import { setStatus } from '../../redux/detailEditSlice.js'

const PersonItem = ({ person }) => {
  const dispatch = useDispatch()
  const people = useSelector((state) => state.people.data)
  const insertedIds = useSelector((state) => state.people.inserted)
  const { container } = useSelector((state) => state.detailEditInfo)
  const { setMapCenter } = useContext(MapContext)

  const { friends } = person

  const selectedPersonId = useSelector((state) => state.person.id)
  const [isSelected, setIsSelected] = useState(person.id === selectedPersonId)

  // Set `selected` for the selected-list of People List
  useEffect(() => {
    setIsSelected(person.id === selectedPersonId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPersonId])

  const handleItemClick = () => {
    // Action of clicking the People List
    dispatch(selectPerson(person))
    dispatch(setStatus(0))

    if (friends.length > 0) {
      const locations = friends
        .map((friendId) => {
          const friend = people.find((person) => person.id === friendId)

          if (friend === undefined) return null

          const {
            coordinates: [lng, lat],
          } = friend.primaryLocation || { coordinates: [0, 0] }

          return { id: friendId, lng, lat }
        })
        .filter((location) => location !== null)

      // Set Map Viewpot to the position of First Friend only in Map Mode
      if (locations.length > 0 && container === 'map') {
        const { lat, lng } = locations[0]
        setMapCenter({ lat, lng })
      }
      dispatch(addLocation(locations)) // Mark Friends' positions on the Map
    }
  }

  const memoizedListItem = useMemo(() => {
    console.log(1)
    const isPersonInserted = insertedIds.includes(person.id)

    return (
      <ListItem
        id={`person-item-${person.id}`}
        disablePadding
        sx={{
          marginBottom: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxShadow: '0px 2px 2px rgba(0,0,0,0.3)',
        }}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              dispatch(setStatus(2))
              dispatch(deSelectPerson())
              dispatch(removePerson(person.id))
            }}
          >
            <DeleteIcon sx={{ color: isPersonInserted ? purple[400] : '' }} />
          </IconButton>
        }
      >
        <ListItemButton selected={isSelected} onClick={handleItemClick}>
          <ListItemIcon sx={{ marginRight: '10px', minWidth: '30px' }}>
            <Avatar
              sx={{ bgcolor: isPersonInserted ? purple[400] : blue[600] }}
            >
              {person.forename.charAt(0) || 'A'}
            </Avatar>
          </ListItemIcon>

          <ListItemText
            primary={`${person.forename} ${person.surname}`}
            secondary={
              <>
                <b>DOB: </b>
                {person.dob}
                &nbsp;&nbsp;&nbsp;
                <b>SSN: </b>
                {person.ssn}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, person, isSelected, insertedIds])

  return memoizedListItem
}

export default PersonItem
