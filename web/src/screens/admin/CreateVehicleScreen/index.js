import React, { useState } from 'react'

import { useAlert } from 'context'
import { useAdmin } from 'context/AdminProvider'

import { Link } from 'react-router-dom'
import Screen from 'components/Screen'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DriverModal from './DriverModal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'


const CreateVehicleScreen = () => {
  const { createVehicle } = useAdmin()
  const { activateLoading, stopLoadingAndShowAlert } = useAlert()

  const [driver, setDriver] = useState(null)

  const [driverShown, setDriverShown] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()

    activateLoading()
    const data = new FormData(event.currentTarget)
    const brand = data.get('brand')
    const model = data.get('model')
    const capacity = data.get('capacity')
    const year = data.get('year')

    const vehicle = {
      driver: driver._id,
      brand, model, capacity, year
    }
    createVehicle(vehicle).then(() => {
      stopLoadingAndShowAlert(true, 'The vehicle is successfully created!')
    }).catch(err => {
      stopLoadingAndShowAlert(false, err)
    })
  }

  return (
    <Screen maxWidth='xs'>
      <Typography variant='h5' sx={styles.heading}>
        Create a task
      </Typography>
      <Typography variant='p' sx={styles.subheading}>
        The necessary inputs will pop up as you continue.
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DriverModal
          visible={driverShown}
          setVisible={setDriverShown}
          driver={driver}
          setDriver={setDriver}
        />
        <Box sx={styles.section}>
          <Button
            variant='text'
            color={driver == null ? 'primary' : 'secondary'}
            sx={{ mt: 3, mb: 2 }}
            onClick={() => { setDriverShown(true) }}
          >
            {driver == null
              ? 'Choose a driver'
              : 'Driver chosen'
            }
          </Button>
          {driver != null &&
            <Typography component='p' sx={styles.label}>
              {driver.name} {driver.surname}
            </Typography>
          }
        </Box>
        {driver != null &&
          <>
            <TextField
              margin='normal'
              required
              fullWidth
              label='Brand'
              name='brand'
              autoComplete='brand'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Model'
              name='model'
              autoComplete='model'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Capacity'
              name='capacity'
              autoComplete='capacity'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Production year'
              name='year'
              autoComplete='year'
            />
          </>
        }
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >Create</Button>
      </Box>
      <Link to='/'>
        <Button
          fullWidth
          variant='outlined'
          sx={{ mt: 3, mb: 2 }}
          startIcon={<ArrowBackIcon />}
        >Go back</Button>
      </Link>
    </Screen>
  )
}

const styles = {
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    mb: 3
  },
  subheading: {
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.8
  },
  label: {
    fontWeight: 500,
    fontSize: 18
  }
}

export default CreateVehicleScreen