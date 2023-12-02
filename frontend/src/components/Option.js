import React from 'react'

import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

import { COLORS } from 'utils/constants'

const Option = ({ onPress, noArrow, children, style }) => {
    return (
        <TouchableOpacity
            style={[styles.option, style]}
            onPress={onPress}
        >
            <Text style={styles.text}>{children}</Text>
            {!noArrow &&
                <Text style={styles.arrow}>{'>'}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    option: {
        padding: 5,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
    },
    arrow: {
        fontSize: 20,
        color: COLORS.primary
    }
})

export default Option
