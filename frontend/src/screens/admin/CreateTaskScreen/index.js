import React, { useState } from 'react'

import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import Screen from 'components/Screen'
import MapView from 'react-native-maps'
import MapModal from './MapModal'
import ExecutorModal from './ExecutorModal'

const CreateTaskScreen = () => {
    const [executor, setExecutor] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [deadline, setDeadline] = useState()
    const [routes, setRoutes] = useState({})

    const [driversVisible, setDriversVisible] = useState(false)
    const [mapVisible, setMapVisible] = useState(false)

    return (
        <Screen>
            <ExecutorModal
                visible={driversVisible}
                setVisible={setDriversVisible}
            />
            <Button
                style={styles.btn}
                onPress={() => { setDriversVisible(true) }}
            >Show drivers</Button>
            <MapModal
                visible={mapVisible}
                setVisible={setMapVisible}
            />
            <Button
                style={styles.btn}
                onPress={() => { setMapVisible(true) }}
            >Open the map</Button>
        </Screen>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginVertical: 10
    }
})

export default CreateTaskScreen