import React, { useState } from 'react'

import { View, Text, StyleSheet } from 'react-native'

import Screen from 'components/Screen'
import VehicleModal from './VehicleModal'
import Option from 'components/Option'

const CreateFuelingScreen = () => {
    const [vehicle, setVehicle] = useState(null)

    const [modalVisible, setModalVisible] = useState(false)
    const [vehiclesFound, setVehiclesFound] = useState(false)

    return (
        <Screen>
            <VehicleModal
                visible={modalVisible}
                setVisible={setModalVisible}
                setVehicle={setVehicle}
                setVehiclesFound={setVehiclesFound}
            />
            <Option
                style={styles.option}
                onPress={() => {
                    if (vehiclesFound)
                        setModalVisible(true)
                }}
            >
                {vehiclesFound
                    ? vehicle == null
                        ? 'Choose a vehicle'
                        : `${vehicle.brand} ${vehicle.model}`
                    : 'No vehicles found'
                }
            </Option>
        </Screen>
    )
}

const styles = StyleSheet.create({

})

export default CreateFuelingScreen