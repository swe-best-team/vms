import React from 'react'
import { View, Text, Button } from 'react-native'

import { useAuth } from 'context'

const HelloScreen = () => {
    const { user, logoutUser } = useAuth()
    const { name, surname } = user

    return (
        <View>
            <Text>This is HelloScreen for admin</Text>
            <Text>Hello, {name} {surname}</Text>
            <Button
                title='Log out'
                onPress={logoutUser}
            />
        </View>
    )
}

export default HelloScreen