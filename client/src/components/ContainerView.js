import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

import { lightBlue, pink } from '@mui/material/colors'
import NavigationIcon from '@mui/icons-material/Navigation'
import DescriptionIcon from '@mui/icons-material/Description'

import MapComponent from './MapComponent'
import DataVisualization from './DataVisualization'

import { selectContainer } from '../redux/detailEditSlice'
import HtmlTooltip from './HTMLTooltip'

const pinkStyle = {
  backgroundColor: pink[400],
  '&:hover': {
    backgroundColor: pink[600],
  },
}

// Memoized MapComponent to prevent unnecessary re-renders
const MemoizedMapComponent = React.memo(MapComponent)

// Memoized DataVisualization to prevent unnecessary re-renders
const MemoizedDataVisualization = React.memo(DataVisualization)

const ContainerView = () => {
  const dispatch = useDispatch()
  const { container } = useSelector((state) => state.detailEditInfo)

  const handleChange = (_, nextView) => {
    dispatch(selectContainer(nextView))
  }

  return (
    <div style={{ marginRight: '-20px' }}>
      <ToggleButtonGroup
        orientation="vertical"
        value={container}
        exclusive
        style={{ position: 'fixed', top: 100, left: 0, zIndex: 1 }}
      >
        <ToggleButton
          selected={container === 'chart'}
          onChange={() => handleChange(null, 'chart')}
          sx={{
            backgroundColor:
              container === 'chart' ? lightBlue[300] : lightBlue[400],
            opacity: container === 'chart' ? 1 : 0.7,
            '&:hover': {
              backgroundColor: lightBlue[500],
              opacity: 1,
            },
          }}
          value="chart"
          aria-label="chart"
          color="info"
          size="large"
        >
          <HtmlTooltip
            placement="right"
            title={<Typography color="inherit">{'Report Doc'}</Typography>}
          >
            <DescriptionIcon />
          </HtmlTooltip>
        </ToggleButton>
        <ToggleButton
          selected={container === 'map'}
          onChange={() => handleChange(null, 'map')}
          sx={{ ...pinkStyle }}
          value="map"
          aria-label="map"
          color="secondary"
          size="large"
        >
          <HtmlTooltip
            placement="right"
            title={<Typography color="inherit">{'Google Map Mode'}</Typography>}
          >
            <NavigationIcon />
          </HtmlTooltip>
        </ToggleButton>
      </ToggleButtonGroup>

      <div style={{ display: container === 'chart' ? 'none' : '' }}>
        <MemoizedMapComponent />
      </div>
      <div style={{ display: container === 'map' ? 'none' : '' }}>
        <MemoizedDataVisualization />
      </div>
    </div>
  )
}

export default ContainerView
