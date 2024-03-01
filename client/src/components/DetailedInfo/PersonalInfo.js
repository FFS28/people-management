import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  FormControl,
  Box,
  TextField,
  Tabs,
  Tab,
  Typography,
} from '@mui/material'

import HtmlTooltip from '../HTMLTooltip'
import { formatDate } from '../../utils/formatDate'
import CustomTabPanel from './CustomTabPanel'

import { setStatus } from '../../redux/detailEditSlice'
import { apiAddPerson, apiEditPerson } from '../../redux/peopleSlice'

const PersonalInfo = () => {
  // status - 'view' | 'edit' | 'add'
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.detailEditInfo)
  const person = useSelector((state) => state.person)
  const { data } = useSelector((state) => state.people)
  const locations = useSelector((state) => state.locations)

  const [validationError, setValidationError] = useState(false)
  const [addedPersonId, setAddedPersonId] = useState(null)

  const textColor = ['primary', 'success', 'secondary']

  const forenameRef = useRef(null)
  const surnameRef = useRef(null)
  const dobRef = useRef(null)
  const ssnRef = useRef(null)
  const issuedDateRef = useRef(null)

  const [formData, setFormData] = useState({
    forename: '',
    surname: '',
    dob: '',
    ssn: '',
    issuedDateAndTime: '',
    lat: '51.917738',
    lng: '17.455256',
  })

  useEffect(() => {
    if (status !== 0 && locations.length !== 0) {
      setFormData((prevState) => ({
        ...prevState,
        lat: locations[0].lat,
        lng: locations[0].lng,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations])

  // After a Person added, scroll to the new Item and Click
  useEffect(() => {
    if (addedPersonId !== null && status !== 0) {
      // Find the index of the added person in the people array: in this case, 0
      const addedPersonIndex = data.findIndex(
        (person) => person.id === addedPersonId
      )

      // Scroll to the added person in the list
      if (addedPersonIndex !== -1) {
        const listItem = document.getElementById(`person-item-${addedPersonId}`)
        status === 2 &&
          listItem &&
          listItem.scrollIntoView({ behavior: 'smooth' })

        // Trigger a click on the list item
        const clickableDiv = listItem.querySelector('div:first-of-type').click()
        clickableDiv && clickableDiv.click()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedPersonId])

  // Function to determine if non-friend properties have changed
  const shouldUpdateFormData = (currentData, newPerson) => {
    return (
      currentData.forename !== newPerson.forename ||
      currentData.surname !== newPerson.surname ||
      formatDate(currentData.dob) !==
        formatDate(newPerson.dob || '1999-01-01') ||
      currentData.ssn !== newPerson.ssn ||
      formatDate(currentData.issuedDateAndTime) !==
        formatDate(newPerson.issuedDateAndTime || '')
    )
  }

  useEffect(() => {
    // Check if updates are required excluding the friends list
    if (shouldUpdateFormData(formData, person)) {
      const [lng, lat] = person.primaryLocation.coordinates
      setFormData({
        forename: person.forename || '',
        surname: person.surname || '',
        dob: person.dob || formatDate('1999-01-01'),
        ssn: person.ssn || '',
        issuedDateAndTime: formatDate(person.issuedDateAndTime || ''),
        lng,
        lat,
      })
    }
    // Omitting person.friends from dependencies to avoid updates when only friends change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    person.forename,
    person.surname,
    person.dob,
    person.ssn,
    person.issuedDateAndTime,
    person.primaryLocation,
  ])

  // Focus on the "Forename" input when status changes
  useEffect(() => {
    if (status === 2 && forenameRef.current) {
      forenameRef.current.focus()
    }
  }, [status])

  // Focus to Next Input when hit `Enter`
  const handleEnterKey = (currentRef, nextRef) => (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      nextRef.current && nextRef.current.focus()
    }
  }

  useEffect(() => {
    if (!!formData.forename && !!formData.surname && !!formData.ssn) {
      setValidationError(false)
    } else {
      setValidationError(true)
    }
  }, [formData.forename, formData.surname, formData.ssn])

  const handleChange = (e) => {
    if (status === 0) dispatch(setStatus(1))

    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const validateForm = () => {
    if (!!formData.forename && !!formData.surname && !!formData.ssn)
      return false
    return true
  }

  // Submit the Form
  const handleClick = () => {
    const isValid = validateForm()

    if (status === 0) return

    if (!isValid) {
      // Generate personData with the matching structure of people.json file
      const { lat, lng, ...formDataWithoutLatLng } = formData
      const personData = {
        ...formDataWithoutLatLng,
        friends: person.friends,
        image: '',
        primaryLocation: {
          type: 'Point',
          coordinates: [lng, lat],
        },
      }

      if (status === 1) {
        dispatch(apiEditPerson({ id: person.id, ...personData }))
          .unwrap()
          .then((newPerson) => {
            setAddedPersonId(newPerson.id) // Just Click
          })
      } else if (status === 2) {
        dispatch(apiAddPerson(personData))
          .unwrap()
          .then((newPerson) => {
            setAddedPersonId(newPerson.id) // Focus to and Click
          })
      }
    } else {
      alert('Please fill in all required fields.')
    }
  }

  return (
    <Box>
      <Tabs
        value="detail"
        variant="fullWidth"
        textColor={status !== 1 ? textColor[status] : undefined}
        indicatorColor={status !== 1 ? textColor[status] : undefined}
        TabIndicatorProps={{
          style: { background: status === 1 ? '#00803a' : '' },
        }}
      >
        <Tab
          style={{ color: status === 1 ? '#00803a' : '' }}
          value="detail"
          disabled={status !== 0 && validationError}
          label={
            status === 0 ? (
              <b>Personal Details</b>
            ) : status === 1 ? (
              <b>Save</b>
            ) : (
              <b>Add</b>
            )
          }
          onClick={handleClick}
        />
      </Tabs>

      <CustomTabPanel value="detail" index={'detail'}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField
                required={status !== 0}
                error={status !== 0 && formData.forename === ''}
                color={textColor[status]}
                variant="standard"
                name="forename"
                label="Forename"
                size="small"
                value={formData.forename}
                onChange={handleChange}
                inputRef={forenameRef}
                onKeyDown={handleEnterKey(forenameRef, surnameRef)}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required={status !== 0}
                error={status !== 0 && formData.surname === ''}
                color={textColor[status]}
                variant="standard"
                name="surname"
                label="Surname"
                size="small"
                value={formData.surname}
                onChange={handleChange}
                inputRef={surnameRef}
                onKeyDown={handleEnterKey(surnameRef, dobRef)}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                color={textColor[status]}
                variant="standard"
                name="dob"
                label="DOB"
                size="small"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                inputRef={dobRef}
                onKeyDown={handleEnterKey(dobRef, ssnRef)}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required={status !== 0}
                error={status !== 0 && formData.ssn === ''}
                color={textColor[status]}
                variant="standard"
                name="ssn"
                label="SSN"
                size="small"
                value={formData.ssn}
                onChange={handleChange}
                inputRef={ssnRef}
                onKeyDown={handleEnterKey(ssnRef, issuedDateRef)}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                color={textColor[status]}
                variant="standard"
                name="issuedDateAndTime"
                label="Issued Date"
                size="small"
                type="date"
                value={formData.issuedDateAndTime}
                onChange={handleChange}
                inputRef={issuedDateRef}
                onKeyDown={handleEnterKey(issuedDateRef, forenameRef)}
              />
            </FormControl>

            <HtmlTooltip
              placement="left-start"
              title={
                <Typography color="inherit">
                  {
                    'Click on the map to save the physical address (latitude, longitude).'
                  }
                </Typography>
              }
            >
              <Box display="flex" flexDirection="row">
                <FormControl fullWidth>
                  <TextField
                    color={textColor[status]}
                    label="latitude"
                    value={formData.lat}
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    color={textColor[status]}
                    label="longitude"
                    value={formData.lng}
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </FormControl>
              </Box>
            </HtmlTooltip>
          </Box>
        </Box>
      </CustomTabPanel>
    </Box>
  )
}

export default PersonalInfo
