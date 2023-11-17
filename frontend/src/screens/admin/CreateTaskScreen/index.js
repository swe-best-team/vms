import React, { useEffect, useState } from 'react'

import { useAdmin } from 'context/AdminProvider'
import { useAlert } from 'context/AlertProvider'

import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Screen from 'components/Screen'
import Option from 'components/Option'

import MapModal from './MapModal'
import ExecutorModal from './ExecutorModal'
import VehicleModal from './VehicleModal'
import CalendarModal from './CalendarModal'

const CreateTaskScreen = () => {
    const { createTask } = useAdmin()
    const { activateLoading, stopLoadingAndShowAlert } = useAlert()

    const [executor, setExecutor] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const [deadline, setDeadline] = useState(null)
    const [routes, setRoutes] = useState([])

    const [driversVisible, setDriversVisible] = useState(false)
    const [vehiclesVisible, setVehiclesVisible] = useState(false)
    const [vehiclesFound, setVehiclesFound] = useState(false)
    const [mapVisible, setMapVisible] = useState(null)
    const [calendarVisible, setCalendarVisible] = useState(false)
    const [createDisabled, setCreateDisabled] = useState(false)

    const addRoute = () => {
        setRoutes([...routes, null])
    }
    const create = () => {
        activateLoading()

        const date = new Date(deadline.timestamp)
        const task = {
            executor: executor._id,
            vehicle: vehicle._id,
            deadline: date.toISOString(),
            routes
        }
        createTask(task).then(() => {
            console.log('a task created!')
            stopLoadingAndShowAlert(true, 'The task is successfully created!')
        }).catch(err => {
            console.error(err)
            stopLoadingAndShowAlert(false, err)
        })
    }

    useEffect(() => {
        setVehicle(null)
    }, [executor])
    useEffect(() => {
        setRoutes([])
    }, [vehicle])
    useEffect(() => {
        if (routes.length == 0)
            return setCreateDisabled(true)
        for (const route of routes)
            if (route == null)
                return setCreateDisabled(true)
        setCreateDisabled(false)
    }, [routes])

    return (
        <Screen>
            <ExecutorModal
                visible={driversVisible}
                setVisible={setDriversVisible}
                setExecutor={setExecutor}
            />
            <Option
                onPress={() => { setDriversVisible(true) }}
            >
                {executor == null
                    ? 'Choose a driver'
                    : `${executor.name} ${executor.surname}`}
            </Option>
            {executor &&
                <>
                    <VehicleModal
                        visible={vehiclesVisible}
                        setVisible={setVehiclesVisible}
                        setVehicle={setVehicle}
                        driver={executor}
                        setVehiclesFound={setVehiclesFound}
                    />
                    <Option
                        style={styles.option}
                        onPress={() => {
                            if (vehiclesFound)
                                setVehiclesVisible(true)
                        }}
                    >
                        {vehiclesFound
                            ? vehicle == null
                                ? 'Choose a vehicle'
                                : `${vehicle.brand} ${vehicle.model}`
                            : 'The selected driver has no vehicles'
                        }
                    </Option>
                </>}
            {vehicle != null && (
                <>
                    <CalendarModal
                        visible={calendarVisible}
                        setVisible={setCalendarVisible}
                        deadline={deadline}
                        setDeadline={setDeadline}
                    />
                    <Option
                        onPress={() => { setCalendarVisible(true) }}
                    >
                        {deadline == null
                            ? 'Choose the deadline'
                            : deadline.dateString
                        }
                    </Option>
                </>
            )}
            {deadline != null &&
                <>
                    {routes.map((route, i) => {
                        const order = i + 1
                        return (
                            <View key={i}>
                                <MapModal
                                    visible={mapVisible == i}
                                    close={selectedRoute => {
                                        let newRoutes = [...routes]
                                        newRoutes[i] = selectedRoute
                                        setRoutes(newRoutes)
                                        setMapVisible(null)
                                    }}
                                />
                                <Option
                                    onPress={() => { setMapVisible(i) }}
                                >
                                    {routes[i] == null
                                        ? `Set up route ${order}`
                                        : `Route ${order} is set`
                                    }
                                </Option>
                            </View>
                        )
                    })}
                    <Button
                        style={styles.btn}
                        onPress={addRoute}
                    >Add a route</Button>
                </>
            }
            <Button
                mode='contained'
                style={styles.btn}
                onPress={create}
                disabled={createDisabled}
            >Create</Button>
        </Screen >
    )
}

const styles = StyleSheet.create({
    btn: {
        marginVertical: 10
    }
})

export default CreateTaskScreen