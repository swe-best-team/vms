import React from 'react'

import { useAuth } from 'context'

import { StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-paper'
import Screen from 'components/Screen'

const AdminScreen = ({ navigation }) => {
    const { user, logout } = useAuth()
    const { name, surname } = user

    return (
        <Screen>
            <Text
                variant='titleLarge'
                style={styles.title}
            >Welcome, admin {name} {surname}!</Text>
            <Button
                onPress={() => navigation.navigate('CreateUserScreen')}
                style={styles.btn}
            >Create a user</Button>
            <Button
                onPress={() => navigation.navigate('CreateTaskScreen')}
                style={styles.btn}
            >Create a task</Button>
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

export default AdminScreen