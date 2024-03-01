import React from 'react'
import { useSelector } from 'react-redux'

import { List } from '@mui/material'

import PersonItem from './PersonItem'
import Loading from '../Loading'

const ListShow = ({ filter }) => {
  const { data, status } = useSelector((state) => state.people)
  return (
    <List>
      <Loading isLoading={status === 'loading'} />

      {data
        .filter((person) => {
          return (person.forename + person.surname)
            .toLowerCase()
            .includes(filter.toLowerCase())
        })
        .map((person) => (
          <PersonItem key={person.id} person={person} />
        ))}
    </List>
  )
}

export default React.memo(ListShow)
