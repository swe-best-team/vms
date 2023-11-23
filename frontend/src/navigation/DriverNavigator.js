import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import PersonalScreen from 'screens/PersonalScreen'
import DriverScreen from 'screens/driver'
import VehicleScreen from 'screens/driver/VehicleScreen'

const Tab = createNativeStackNavigator()
const { Screen, Navigator } = Tab

const DriverNavigator = () =>
    <Navigator
        initialRouteName='DriverScreen'
    >
        <Screen
            name='PersonalScreen'
            component={PersonalScreen}
            options={{ title: 'Personal Info' }}
        />
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