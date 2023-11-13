import React, { useEffect, useMemo, useState } from 'react'

import { useAuth } from 'context'
import { useAdmin } from 'context/AdminProvider'

import { Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import Screen from 'components/Screen'
import { Button } from 'react-native-paper'

const ExecutorModal = ({ visible, setVisible }) => {
    const { serverConnected } = useAuth()
    const { getAllDrivers } = useAdmin()

    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        if (!serverConnected) return
        getAllDrivers().then(data => {
            setDrivers(data)
            console.log('Drivers found!')
        }).catch(err => { console.error(err) })
    }, [])

    return (
        <Modal
            animationType='slide'
            visible={visible}
            onRequestClose={() => {
                console.log('Modal has been closed')
            }}
        >
            <Screen>
                <FlatList
                    data={drivers}
                    keyExtractor={driver => driver._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Text>{item.name} {item.surname}</Text>
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
    btn: {
        marginVertical: 10
    }
})

export default ExecutorModal