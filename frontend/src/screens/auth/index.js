import React, { useState } from 'react'

import { useAuth } from 'context'

import {
    StyleSheet
} from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'
import Screen from 'components/Screen'

const LoginScreen = () => {
    const { login } = useAuth()

    const [email, setEmail] = useState('driver@email.com')
    const [password, setPassword] = useState('alihan123')

    const btnDisabled = !(email && password)
    const onPress = () => login(email, password)

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
                autoCapitalize='none'
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

export default LoginScreen