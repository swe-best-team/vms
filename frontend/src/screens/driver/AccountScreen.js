import React from 'react'
import { View, Text, Button } from 'react-native'

import { useAuth } from 'context'

const AccountScreen = () => {
    const { user, logoutUser } = useAuth()
    const { name, surname } = user

    return (
        <View>
            <Text>This is AccountScreen</Text>
            <Text>Hello, {name} {surname}</Text>
            <Button
                title='Log out'
                onPress={logoutUser}
            />
        </View>
    )
}

export default AccountScreen