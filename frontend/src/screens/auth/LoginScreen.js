import React from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'

import { useAuth } from 'context'

const LoginScreen = () => {
    const { loginUser } = useAuth()

    return (
        <View>
            <Text>This is LoginScreen</Text>
            <Button
                title='Log in'
                onPress={loginUser}
            />
        </View>
    )
}

export default LoginScreen