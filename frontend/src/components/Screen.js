import React from 'react'

import {
    SafeAreaView,
    StatusBar,
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
        marginHorizontal: 20,
        paddingVertical: 20
    }
})

export default Screen