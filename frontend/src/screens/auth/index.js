import React, { useState } from 'react'

import { useAuth, useAlert } from 'context'

import {
    StyleSheet
} from 'react-native'
import {
    Text,
    TextInput,
    Button
} from 'react-native-paper'
import Screen from 'components/Screen'

const AuthScreen = () => {
    const { login } = useAuth()
    const { activateLoading, stopLoading, stopLoadingAndShowAlert } = useAlert()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const btnDisabled = !(email && password)
    const onPress = () => {
        activateLoading()
        login(email, password).then(() => {
            stopLoading()
        }).catch(err => {
            stopLoadingAndShowAlert(false, err)
        })
    }

    return (
        <Screen style={styles.container}>
            <Text
                variant='displaySmall'
                style={styles.heading}
            >Input your credentials</Text>
            <TextInput
                label='Email'
                value={email}
                onChangeText={text => setEmail(text.toLowerCase())}
                mode='outlined'
                style={styles.input}
            />
            <TextInput
                label='Password'
                value={password}
                onChangeText={text => setPassword(text.toLowerCase())}
                mode='outlined'
                secureTextEntry
                style={styles.input}
            />
            <Button
                mode='contained'
                onPress={onPress}
                disabled={btnDisabled}
                style={styles.btn}
            >Log in</Button>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    heading: {
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        marginBottom: 20
    },
    btn: {
        marginTop: 20
    }
})

export default AuthScreen