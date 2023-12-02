import React from 'react'

import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { capitalizeFirstLetter } from 'utils/helpers'

const Field = ({ name, val }) => {
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

export default Field