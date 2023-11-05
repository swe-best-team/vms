import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AdminScreen from 'screens/admin'

const Tab = createBottomTabNavigator()
const { Screen, Navigator } = Tab

const AdminNavigator = () => {
    return (
        <Navigator
            initialRouteName='AdminScreen'
        >
            <Screen
                name='AdminScreen'
                component={AdminScreen}
                options={{ title: 'Admin' }}
            />
        </Navigator>
    )
}

export default AdminNavigator