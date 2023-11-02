import React from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'

import { useAuth } from 'context'

const LoginScreen = () => {
    const { login } = useAuth()

    const onPress = () => login('driver@email.com', 'alihan123')

    return (
        <View>
            <Text>This is LoginScreen</Text>
            <Button
                title='Log in'
                onPress={onPress}
            />
        </View>
    )
}

export default LoginScreen