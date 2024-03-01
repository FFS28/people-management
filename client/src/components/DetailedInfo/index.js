import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Divider, Tabs, Tab, Autocomplete, TextField } from '@mui/material'
import Diversity3Icon from '@mui/icons-material/Diversity3'

import PersonalInfo from './PersonalInfo'
import FriendsList from './FriendsList'
import CustomTabPanel from './CustomTabPanel'

import MapContext from '../../contexts/MapContext'

import { setStatus } from '../../redux/detailEditSlice'
import { addFriend } from '../../redux/personSlice'
import { attatchLocation } from '../../redux/locationSlice'

const DetailedInfo = () => {
  // status - 'view' | 'edit' | 'add'
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.detailEditInfo)
  const people = useSelector((state) => state.people.data)
  const { id, friends } = useSelector((state) => state.person)
  const friendsList = [...friends, id]

  const { setMapCenter } = useContext(MapContext)

  const [value, setValue] = useState(null) // State to control the value of the Autocomplete
  const [inputValue, setInputValue] = useState('') // State to control the input value

  const defaultProps = {
    options: people
      .map((person) => {
        const { id } = person
        const [lng, lat] = person.primaryLocation.coordinates || [
          17.455256, 51.917738,
        ]
        const option = {
          title: `${person.forename} ${person.surname}`,
          id,
          location: { id, lng, lat },
        }
        return option
      })
      .filter((person) => !friendsList.includes(person.id)),
    getOptionLabel: (option) => option.title,
  }

  // Function to clear the Autocomplete
  const clearAutocomplete = () => {
    setValue(null)
    setInputValue('')
  }

  // Add Friends when Select one on the Select List
  const handleChange = (_, newValue) => {
    if (status === 0) dispatch(setStatus(1)) // Enable `Save` Button to Set the Status `edit`

    dispatch(addFriend(newValue.id))
    dispatch(attatchLocation(newValue.location))

    const { lat, lng } = newValue.location
    setMapCenter({ lat, lng })
    clearAutocomplete()
  }

  // Handler to update the input field value
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 20px)', // Set the outer box to take full height
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        borderRight: '1px groove',
        borderLeft: '1px dashed',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <PersonalInfo />
      </Box>

      <Divider style={{ width: '100%' }} />

      <Box sx={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <Box sx={{ height: '100%' }}>
          <Tabs
            value="friends"
            variant="fullWidth"
            aria-label="icon tabs example"
            TabIndicatorProps={{
              style: { background: '#2fbba9' },
            }}
          >
            <Tab
              style={{ color: '#2fbba9' }}
              value="friends"
              icon={<Diversity3Icon />}
              label="Friends"
              aria-label="Friends"
            />
          </Tabs>

          <CustomTabPanel value="friends" index={'friends'}>
            <Autocomplete
              {...defaultProps}
              id="clear-on-blur"
              clearOnEscape
              clearOnBlur
              value={value}
              inputValue={inputValue}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Friend"
                  onChange={handleInputChange}
                  variant="standard"
                />
              )}
            />
            <Box
              sx={{
                marginTop: '5px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                overflowY: 'auto', // Add scroll to the y-axis
                maxHeight: 'calc(100vh - 570px)', // Adjust the 200px according to the total height of all other elements above this Box
              }}
            >
              <FriendsList />
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  )
}

export default DetailedInfo
