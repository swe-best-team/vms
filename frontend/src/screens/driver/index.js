import React from 'react'

import { useAuth } from 'context'

import { StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-paper'
import Screen from 'components/Screen'
import Card from 'components/Card'

const actions = [
    {
        title: 'View personal info',
        description: '',
        location: 'PersonalScreen'
    },
    {
        title: 'View my tasks',
        description: '',
        location: 'TasksScreen'
    }
]

const DriverScreen = ({ navigation }) => {
    const { user, logout } = useAuth()
    const { name, surname } = user

    return (
        <Screen>
            <Text
                variant='titleLarge'
                style={styles.title}
            >Welcome, driver {name} {surname}!</Text>
            {actions.map((action, i) =>
                <Card
                    key={i}
                    title={action.title}
                    description={action.description}
                    onPress={() => { navigation.navigate(action.location) }}
                />
            )}
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

export default DriverScreen