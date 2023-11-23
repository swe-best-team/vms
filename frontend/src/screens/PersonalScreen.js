import React from 'react'

import { useAuth } from 'context'

import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Screen from 'components/Screen'

import { capitalizeFirstLetter } from 'utils/helpers'

const PersonalScreen = () => {
    const { user } = useAuth()
    const { name, surname } = user

    return (
        <Screen>
            {Object.keys(user).map(key =>
                <Field
                    key={key}
                    name={key}
                    val={user[key]}
                />
            )}
        </Screen>
    )
}

const Field = ({ name, val }) => {
    console.log(name)
    if (name == '_id')
        name = 'ID'

    name = capitalizeFirstLetter(name)

    return (
        <View style={styles.field}>
            <Text style={styles.key}>{name}:</Text>
            <Text style={styles.val}>{val}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        marginVertical: 5
    },
    key: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 10,

    },
    val: {
        flex: 2
    }
})

export default PersonalScreen