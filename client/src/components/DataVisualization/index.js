import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

const DataVisualization = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 40px)',
        bgcolor: 'background.default',
        padding: '20px',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          minWidth: 600,
          maxHeight: 'calc(100vh - 140px)',
          overflowY: 'auto',
          maxWidth: '80vw',
          padding: '40px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'auto',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          People Management Application Development Report
        </Typography>
        <Typography variant="h5" gutterBottom>
          Executive Summary
        </Typography>
        <Typography variant="body1" paragraph>
          This report outlines the development and features of the People
          Management application, designed to manage personal information and
          social connections effectively.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          The People Management app is a robust platform that enables users to
          add, edit, and visualize personal and relational information. It
          utilizes a friendly UI and integrates sophisticated features for an
          optimal user experience.
        </Typography>
        <br />
        <Typography variant="h5" gutterBottom>
          Features and Functionalities
        </Typography>
        <Typography variant="h6">Google Map Integration</Typography>
        <Typography variant="body1" paragraph>
          Location Visualization: Leveraging Google Maps, the app vividly
          displays the geographic positions of an individual's friends,
          enhancing the relational data's context and usability.
        </Typography>
        <Typography variant="h6" paragraph>
          Friend Management
        </Typography>
        <Typography variant="body1" paragraph>
          Social Network Handling: The app intricately manages the relationships
          within the people's data, allowing users to maintain and visualize
          social connections.
        </Typography>
        <Typography variant="h6" paragraph>
          Edit Mode Location Selection
        </Typography>
        <Typography variant="body1" paragraph>
          Dynamic Location Updates: When editing a person's details, the app
          allows for real-time location changes by selecting a new position on
          the map, providing an interactive way to update geographical
          information.
        </Typography>
        <Typography variant="h6" paragraph>
          Friends List Management
        </Typography>
        <Typography variant="body1" paragraph>
          Intelligent Filtering: The app filters through the people's list to
          ensure no duplicate connections are possible. If a friend's ID is not
          found within the people's list, it is omitted from the available
          choices.
        </Typography>
        <Typography variant="body1" paragraph>
          Exclusion Logic: When adding new friends, the app smartly filters out
          the individual's current friends and themselves, presenting only
          viable options for new connections.
        </Typography>
        <Typography variant="h6" paragraph>
          Map Interaction for New Friends
        </Typography>
        <Typography variant="body1" paragraph>
          Geographical Focus: Upon adding a new friend, the app places a marker
          on the map at the friend's location and centers the view on this
          point, providing immediate geographical context to the new
          relationship.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Conclusion
        </Typography>
        <br />

        <Typography paragraph>
          The People Management application is a comprehensive tool that
          facilitates the management of personal contacts and their social
          networks. It blends practical functionalities with intuitive
          interactions, highlighted by its innovative use of Google Maps for a
          seamless user experience.
        </Typography>
      </Paper>
    </Box>
  )
}

export default DataVisualization
