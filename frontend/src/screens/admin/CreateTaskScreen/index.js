import React, { useEffect, useState } from 'react'

import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Screen from 'components/Screen'
import MapModal from './MapModal'
import ExecutorModal from './ExecutorModal'

import { COLORS } from 'utils/constants'
import VehicleModal from './VehicleModal'

const CreateTaskScreen = () => {
    const [executor, setExecutor] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const [deadline, setDeadline] = useState()
    const [routes, setRoutes] = useState([])

    const [driversVisible, setDriversVisible] = useState(false)
    const [vehiclesVisible, setVehiclesVisible] = useState(false)
    const [vehiclesFound, setVehiclesFound] = useState(false)
    const [visibleMap, setVisibleMap] = useState(null)

    const addRoute = () => {
        setRoutes([...routes, {}])
    }

    useEffect(() => {
        if (vehicle?.driver != executor?._id)
            setVehicle(null)
    }, [executor])

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
                </TouchableOpacity>
            </>}
            {routes.map((route, i) => {
                return <View key={i}>
                    <MapModal
                        visible={visibleMap == i}
                        close={selectedRoute => {
                            let newRoutes = routes
                            newRoutes[i] = selectedRoute
                            setRoutes(newRoutes)
                            setVisibleMap(null)
                        }}
                    />
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => { setVisibleMap(i) }}
                    >
                        <Text>Select route {i + 1}</Text>
                    </TouchableOpacity>
                </View>
            }
            )}
            <Button
                style={styles.btn}
                onPress={addRoute}
            >Add a route</Button>
        </Screen>
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
        marginVertical: 10
    },
    btn: {
        marginVertical: 10
    }
})

export default CreateTaskScreen