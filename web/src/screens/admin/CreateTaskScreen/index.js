import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Screen from 'components/Screen'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import ExecutorModal from './ExecutorModal'
import VehicleModal from './VehicleModal'
import CalendarModal from './CalendarModal'
import MapModal from './MapModal'

const CreateTaskScreen = () => {
    const [executor, setExecutor] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const [deadline, setDeadline] = useState(new Date())

    const [executorShown, setExecutorShown] = useState(false)
    const [vehicleShown, setVehicleShown] = useState(false)
    const [vehiclesFound, setVehiclesFound] = useState(false)
    const [calendarShown, setCalendarShown] = useState(false)

    useEffect(() => { console.log('hey', vehiclesFound) }, [vehiclesFound])

    return (
        <Screen>
            <Typography component='h1' variant='h5' sx={{ textAlign: 'center' }}>
                Create a task
            </Typography>
            <ExecutorModal
                visible={executorShown}
                setVisible={setExecutorShown}
                executor={executor}
                setExecutor={setExecutor}
            />
            <Box sx={styles.section}>
                <Button
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => { setExecutorShown(true) }}
                >Choose a driver</Button>
                {executor != null &&
                    <Typography component='p'>
                        {executor.name} {executor.surname}
                    </Typography>
                }
            </Box>
            {executor != null &&
                <>
                    <VehicleModal
                        visible={vehicleShown}
                        setVisible={setVehicleShown}
                        vehicle={vehicle}
                        setVehicle={setVehicle}
                        driver={executor}
                        setVehiclesFound={setVehiclesFound}
                    />
                    <Box sx={styles.section}>
                        <Button
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => { setVehicleShown(true) }}
                        >Choose a vehicle</Button>
                        {vehicle != null &&
                            <Typography component='p'>
                                {!vehiclesFound
                                    ? 'The selected driver has no vehicles'
                                    : vehicle != null && `${vehicle.brand} ${vehicle.model}`
                                }
                            </Typography>
                        }
                    </Box>
                </>
            }
            {vehicle != null &&
                <>
                    <CalendarModal
                        visible={calendarShown}
                        onClose={() => { setCalendarShown(false) }}
                        deadline={deadline}
                        setDeadline={setDeadline}
                    />
                    <Box sx={styles.section}>
                        <Button
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => { setCalendarShown(true) }}
                        >Select the deadline</Button>
                        <Typography component='p'>
                            {deadline.toLocaleString('en-KZ', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </Typography>
                    </Box>
                </>
            }
            <MapModal />
            <Link to='/'>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
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
}

export default CreateTaskScreen