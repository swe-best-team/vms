import React, { useEffect, useState } from 'react'

import { useAuth } from 'context/AuthProvider'
import { useAdmin } from 'context/AdminProvider'

import { Modal, FlatList, StyleSheet } from 'react-native'
import Screen from 'components/Screen'
import Option from 'components/Option'
import { Button } from 'react-native-paper'

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
        }).catch(err => { console.error(err) })
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
                        <Option
                            onPress={() => { onClose(item) }}
                            noArrow
                        >{item.brand} {item.model}</Option>
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
        marginVertical: 40,
        marginHorizontal: 20
    },
    btn: {
        marginVertical: 10
    }
})

export default VehicleModal