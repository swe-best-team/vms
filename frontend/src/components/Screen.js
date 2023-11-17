import React from 'react'

import {
    SafeAreaView,
    StyleSheet
} from 'react-native'

const Screen = ({ children, style, ...props }) =>
    <SafeAreaView
        style={[styles.container, style]}
        {...props}
    >
        {children}
    </SafeAreaView>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff'
    }
})

export default Screen