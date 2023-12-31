import React from 'react'

import { useAuth } from 'context'

import { StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-paper'
import Screen from 'components/Screen'

const FuelerScreen = ({ navigation }) => {
    const { user, logout } = useAuth()
    const { name, surname } = user

    return (
        <Screen>
            <Text
                variant='titleLarge'
                style={styles.title}
            >Welcome, fueler {name} {surname}!</Text>
            <Button
                onPress={() => { navigation.navigate('CreateFuelingScreen') }}
                style={styles.btn}
            >Create a fueling</Button>
            <Button
                onPress={() => navigation.navigate('PersonalScreen')}
                style={styles.btn}
            >View personal info</Button>

            <Button
                onPress={logout}
                style={styles.btn}
            >Log out</Button>
        </Screen>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center'
    },
    btn: {
        marginTop: 20
    }
})

export default FuelerScreen