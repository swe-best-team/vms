import React, { useEffect, useState } from 'react'

import { useAuth } from 'context/AuthProvider'
import { useAdmin } from 'context/AdminProvider'

import { Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import Screen from 'components/Screen'
import { Button } from 'react-native-paper'

import { COLORS } from 'utils/constants'

const VehicleModal = ({ visible, setVisible, setVehicle, driver, setVehiclesFound }) => {
    const { serverConnected } = useAuth()
    const { getAllVehiclesByDriver } = useAdmin()

    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        if (!serverConnected) return
        getAllVehiclesByDriver(driver._id).then(data => {
            setVehicles(data)
            setVehiclesFound(data.length != 0)
            console.log('vehicles found!')
        }).catch(err => {
            console.error(err)
        })
    }, [driver])

    const onClose = vehicle => {
        setVehicle(vehicle)
        setVisible(false)
    }

    return (
        <Modal
            animationType='slide'
            visible={visible}
        >
            <Screen style={styles.container}>
                <FlatList
                    data={vehicles}
                    keyExtractor={vehicle => vehicle._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => { onClose(item) }}
                        >
                            <Text>{item.brand} {item.model}</Text>
                        </TouchableOpacity>
                    )}
                />
                <Button
                    style={styles.btn}
                    onPress={() => { setVisible(false) }}
                >Close the list</Button>
            </Screen>
        </Modal>
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
        paddingLeft: 15,
        paddingVertical: 7
    },
    btn: {
        marginVertical: 10
    }
})

export default VehicleModal