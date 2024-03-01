import React from 'react'

import ContainerView from './components/ContainerView'
import PeopleSidebar from './components/PeopleSidebar'
import DetailedInfo from './components/DetailedInfo'

import { Grid } from '@mui/material'

function App() {
  return (
    <Grid container spacing={2}>
      {/* DataVisualization */}
      <Grid item xs={12} md={7}>
        <ContainerView />
      </Grid>

      {/* DetailedInfo */}
      <Grid item xs={12} md={2}>
        <DetailedInfo />
      </Grid>

      {/* PeopleList */}
      <Grid item xs={12} md={3}>
        <PeopleSidebar />
      </Grid>
    </Grid>
  )
}

export default App
