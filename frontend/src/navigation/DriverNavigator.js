import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AccountScreen from 'screens/driver/AccountScreen'
import CarScreen from 'screens/driver/CarScreen'

const Tab = createBottomTabNavigator()
const { Screen, Navigator } = Tab

const DriverNavigator = () =>
    <Navigator
        initialRouteName='AccountScreen'
    >
        <Screen
            name='AccountScreen'
            component={AccountScreen}
            options={{ title: 'Account' }}
        />
        <Screen
            name='CarScreen'
            component={CarScreen}
            options={{ title: 'Car' }}
        />
    </Navigator>

export default DriverNavigator