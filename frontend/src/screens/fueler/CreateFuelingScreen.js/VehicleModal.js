import Screen from 'components/Screen'
import React, { useEffect, useState } from 'react'

import { useAuth } from 'context'
import { useFueler } from 'context/FuelerProvider'

import { StyleSheet, Modal, FlatList } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Option from 'components/Option'

const VehicleModal = ({ visible, setVisible, setVehicle, setVehiclesFound }) => {
    const { serverConnected } = useAuth()
    const { getAllVehicles } = useFueler()

    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        if (!serverConnected) return
        getAllVehicles().then(data => {
            console.log(data)
            setVehicles(data)
            setVehiclesFound(data.length != 0)
            console.log('vehicles found!')
        }).catch(err => { console.error(err) })
    }, [])

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
                <Text>VehicleModal</Text>
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
