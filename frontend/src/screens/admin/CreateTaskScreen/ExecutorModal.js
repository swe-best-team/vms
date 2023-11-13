import React, { useEffect, useState } from 'react'

import { useAuth } from 'context/AuthProvider'
import { useAdmin } from 'context/AdminProvider'

import { Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import Screen from 'components/Screen'
import { Button } from 'react-native-paper'

import { COLORS } from 'utils/constants'

const ExecutorModal = ({ visible, setVisible, setExecutor }) => {
    const { serverConnected } = useAuth()
    const { getAllDrivers } = useAdmin()

    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        if (!serverConnected) return
        getAllDrivers().then(data => {
            setDrivers(data)
            console.log('drivers found!')
        }).catch(err => { console.error(err) })
    }, [])

    const onClose = driver => {
        setExecutor(driver)
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
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => { onClose(item) }}
                        >
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

export default ExecutorModal