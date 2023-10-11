import React from 'react'
import { View, Text, Button } from 'react-native'

import { useAuth } from 'context'

const AccountScreen = () => {
    const { user, logoutUser } = useAuth()
    const { firstname, surname } = user

    return (
        <View>
            <Text>This is AccountScreen</Text>
            <Text>Hello, {firstname} {surname}</Text>
            <Button
                title='Log out'
                onPress={logoutUser}
            />
        </View>
    )
}

export default AccountScreen