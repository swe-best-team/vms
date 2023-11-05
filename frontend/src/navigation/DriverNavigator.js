import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import DriverScreen from 'screens/driver'
import VehicleScreen from 'screens/driver/VehicleScreen'

const Tab = createBottomTabNavigator()
const { Screen, Navigator } = Tab

const DriverNavigator = () =>
    <Navigator
        initialRouteName='DriverScreen'
    >
        <Screen
            name='DriverScreen'
            component={DriverScreen}
            options={{ title: 'Driver' }}
        />
        <Screen
            name='VehicleScreen'
            component={VehicleScreen}
            options={{ title: 'Vehicle' }}
        />
    </Navigator>

export default DriverNavigator