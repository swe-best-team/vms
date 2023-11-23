import React, { useEffect, useState } from 'react'

import { useAlert } from 'context'
import { useAdmin } from 'context/AdminProvider'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'
import Screen from 'components/Screen'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ExecutorModal from './ExecutorModal'
import VehicleModal from './VehicleModal'
import CalendarModal from './CalendarModal'
import MapModal from './MapModal'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const CreateTaskScreen = () => {
    const { createTask } = useAdmin()
    const { activateLoading, stopLoadingAndShowAlert } = useAlert()
    const navigate = useNavigate()

    const [executor, setExecutor] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const [deadline, setDeadline] = useState(new Date())
    const [routes, setRoutes] = useState([])

    const [executorShown, setExecutorShown] = useState(false)
    const [vehicleShown, setVehicleShown] = useState(false)
    const [vehiclesFound, setVehiclesFound] = useState(false)
    const [calendarShown, setCalendarShown] = useState(false)
    const [mapVisible, setMapVisible] = useState(null)
    const [createDisabled, setCreateDisabled] = useState(false)

    useEffect(() => {
        if (routes.length === 0)
            return setCreateDisabled(true)
        for (const route of routes)
            if (route == null)
                return setCreateDisabled(true)
        setCreateDisabled(false)
    }, [routes])

    const addRoute = () => {
        setRoutes([...routes, null])
    }
    const create = () => {
        activateLoading()

        const task = {
            executor: executor._id,
            vehicle: vehicle._id,
            deadline: deadline.toISOString(),
            routes
        }

        createTask(task).then(() => {
            console.log('a task created!')
            navigate('/')
            stopLoadingAndShowAlert(true, 'The task is successfully created!')
        }).catch(err => {
            console.error(err)
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
            <ExecutorModal
                visible={executorShown}
                setVisible={setExecutorShown}
                executor={executor}
                setExecutor={setExecutor}
            />
            <Box sx={styles.section}>
                <Button
                    variant='text'
                    color={executor == null ? 'primary' : 'secondary'}
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => { setExecutorShown(true) }}
                >
                    {executor == null
                        ? 'Choose a driver'
                        : 'Driver chosen'
                    }
                </Button>
                {executor != null &&
                    <Typography component='p' sx={styles.label}>
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
                            variant='text'
                            color={vehicle == null ? 'primary' : 'secondary'}
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => { setVehicleShown(true) }}
                        >
                            {vehicle == null
                                ? 'Choose a vehicle'
                                : 'Vehicle chosen'
                            }
                        </Button>
                        {vehicle != null &&
                            <Typography component='p' sx={styles.label}>
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
                            variant='text'
                            color={deadline == null ? 'primary' : 'secondary'}
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => { setCalendarShown(true) }}
                        >Select the deadline</Button>
                        <Typography component='p' sx={styles.label}>
                            {deadline.toLocaleString('en-KZ', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </Typography>
                    </Box>
                    {routes.map((route, i) => {
                        const order = i + 1
                        const routeSet = routes[i] != null
                        return (
                            <Box key={i}>
                                <MapModal
                                    visible={mapVisible === i}
                                    close={selectedRoute => {
                                        let newRoutes = [...routes]
                                        newRoutes[i] = selectedRoute
                                        setRoutes(newRoutes)
                                        setMapVisible(null)
                                    }}
                                    defaultMarkers={routes[i]}
                                />
                                <Box sx={styles.section}>
                                    <Button
                                        variant='text'
                                        color={routeSet ? 'secondary' : 'primary'}
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => { setMapVisible(i) }}
                                    >
                                        {routeSet
                                            ? `Route ${order} is set`
                                            : `Set up route ${order}`
                                        }
                                    </Button>
                                </Box>
                            </Box>
                        )
                    })}
                    <Button
                        variant='outlined'
                        sx={{ mt: 3, mb: 2 }}
                        onClick={addRoute}
                        startIcon={<AddIcon />}
                    >Add a route</Button>
                </>
            }
            <Button
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={create}
                disabled={createDisabled}
            >Create</Button>
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
        mb: 5,
        fontSize: 20,
        textAlign: 'center',
        opacity: 0.8
    },
    label: {
        fontWeight: 500,
        fontSize: 18
    }
}

export default CreateTaskScreen