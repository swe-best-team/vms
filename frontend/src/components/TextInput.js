import React from 'react'

import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

const CustomTextInput = ({ state, setState, ...props }) =>
    <TextInput
        value={state}
        onChangeText={text => setState(text)}
        mode='outlined'
        style={styles.input}
        {...props}
    />

const styles = StyleSheet.create({
    input: {
        marginBottom: 20
    }
})

export default CustomTextInput