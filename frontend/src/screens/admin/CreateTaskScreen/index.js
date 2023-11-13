import React, { useEffect, useState } from 'react'

import { useAdmin } from 'context/AdminProvider'

import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Screen from 'components/Screen'
import MapModal from './MapModal'
import ExecutorModal from './ExecutorModal'

import { COLORS } from 'utils/constants'
import VehicleModal from './VehicleModal'
import CalendarModal from './CalendarModal'

const CreateTaskScreen = () => {
    const { createTask } = useAdmin()

    const [executor, setExecutor] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const [deadline, setDeadline] = useState(null)
    const [routes, setRoutes] = useState([])

    const [driversVisible, setDriversVisible] = useState(false)
    const [vehiclesVisible, setVehiclesVisible] = useState(false)
    const [vehiclesFound, setVehiclesFound] = useState(false)
    const [visibleMap, setVisibleMap] = useState(null)
    const [calendarVisible, setCalendarVisible] = useState(false)
    const [createDisabled, setCreateDisabled] = useState(false)

    const addRoute = () => {
        setRoutes([...routes, null])
    }
    const create = () => {
        const date = new Date(deadline.timestamp)
        const task = {
            executor: executor._id,
            vehicle: vehicle._id,
            deadline: date.toISOString(),
            routes
        }
        createTask(task).then(() => {
            console.log('a task created!')
        }).catch(err => { console.error(err) })
    }

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
        <Screen style={styles.container}>
            <ExecutorModal
                visible={driversVisible}
                setVisible={setDriversVisible}
                setExecutor={setExecutor}
            />
            <TouchableOpacity
                style={styles.option}
                onPress={() => { setDriversVisible(true) }}
            >
                <Text>
                    {executor == null
                        ? 'Choose a driver'
                        : `${executor.name} ${executor.surname}`}
                </Text>
                <Text style={styles.arrow}>{'>'}</Text>
            </TouchableOpacity>
            {executor && <>
                <VehicleModal
                    visible={vehiclesVisible}
                    setVisible={setVehiclesVisible}
                    setVehicle={setVehicle}
                    driver={executor}
                    setVehiclesFound={setVehiclesFound}
                />
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                        if (vehiclesFound)
                            setVehiclesVisible(true)
                    }}
                >
                    <Text>
                        {vehiclesFound
                            ? vehicle == null
                                ? 'Choose a vehicle'
                                : `${vehicle.brand} ${vehicle.model}`
                            : 'The selected driver has no vehicles'
                        }
                    </Text>
                    <Text style={styles.arrow}>{'>'}</Text>
                </TouchableOpacity>
            </>}
            {vehicle != null && (
                <>
                    <CalendarModal
                        visible={calendarVisible}
                        setVisible={setCalendarVisible}
                        deadline={deadline}
                        setDeadline={setDeadline}
                    />
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => { setCalendarVisible(true) }}
                    >
                        <Text>
                            {deadline == null
                                ? 'Choose the deadline'
                                : deadline.dateString
                            }
                        </Text>
                        <Text style={styles.arrow}>{'>'}</Text>
                    </TouchableOpacity>
                </>
            )}
            {deadline != null &&
                <>
                    {routes.map((route, i) => {
                        const order = i + 1
                        return (
                            <View key={i}>
                                <MapModal
                                    visible={visibleMap == i}
                                    close={selectedRoute => {
                                        let newRoutes = [...routes]
                                        newRoutes[i] = selectedRoute
                                        setRoutes(newRoutes)
                                        setVisibleMap(null)
                                    }}
                                />
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => { setVisibleMap(i) }}
                                >
                                    <Text>
                                        {routes[i] == null
                                            ? `Set up route ${order}`
                                            : `Route ${order} is set`
                                        }
                                    </Text>
                                    <Text style={styles.arrow}>{'>'}</Text>
                                </TouchableOpacity>
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
    container: {
        paddingVertical: 10
    },
    option: {
        padding: 5,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15
    },
    arrow: {
        fontSize: 20,
        color: COLORS.primary
    },
    btn: {
        marginVertical: 10
    }
})

export default CreateTaskScreen