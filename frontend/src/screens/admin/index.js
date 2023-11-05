import React from 'react'

import { useAuth } from 'context'

import { StyleSheet } from 'react-native'
import {Text, Button} from 'react-native-paper'
import Screen from 'components/Screen'

const HelloScreen = () => {
    const { user, logout } = useAuth()
    const { name, surname } = user

    return (
        <Screen>
            <Text
                variant='titleLarge'
            >Welcome, {name} {surname}!</Text>
            <Button
                mode='contained'
                onPress={logout}
                style={styles.btn}
            >Log out</Button>
        </Screen>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 20
    }
})

export default HelloScreen