import React from 'react'
import { View, Text } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HelloScreen from 'screens/admin/HelloScreen'

const Tab = createBottomTabNavigator()
const { Screen, Navigator } = Tab

const AdminNavigator = () => {
    return (
        <Navigator
            initialRouteName='HelloScreen'
        >
            <Screen
                name='HelloScreen'
                component={HelloScreen}
            />
        </Navigator>
    )
}

export default AdminNavigator