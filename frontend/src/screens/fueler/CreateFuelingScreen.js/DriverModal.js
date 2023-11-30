import React, { useEffect, useState } from 'react'

import { useAuth } from 'context'

import { Modal, FlatList, StyleSheet } from 'react-native'
import Screen from 'components/Screen'
import Option from 'components/Option'
import { Button } from 'react-native-paper'
import { useFueler } from 'context/FuelerProvider'

const DriverModal = ({ visible, setVisible, setDriver }) => {
    const { serverConnected } = useAuth()
    const { getAllDrivers } = useFueler()

    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        if (!serverConnected) return
        getAllDrivers().then(data => {
            setDrivers(data)
            console.log('drivers found!')
        }).catch(err => { console.error(err) })
    }, [])

    const onClose = driver => {
        setDriver(driver)
        setVisible(false)
    }

    return (
        <Modal
            animationType='slide'
            visible={visible}
        >
            <Screen style={styles.container}>
                <FlatList
                    data={drivers}
                    keyExtractor={driver => driver._id}
                    renderItem={({ item }) => (
                        <Option
                            onPress={() => { onClose(item) }}
                            noArrow
                        >{item.name} {item.surname}</Option>
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

export default DriverModal