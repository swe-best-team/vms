import React from 'react'

import DriverProvider from 'context/DriverProvider'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import PersonalScreen from 'screens/PersonalScreen'
import DriverScreen from 'screens/driver'
import VehicleScreen from 'screens/driver/VehicleScreen'
import TasksScreen from 'screens/driver/TasksScreen'
import SingleTaskScreen from 'screens/driver/SingleTaskScreen'


const Tab = createNativeStackNavigator()
const { Screen, Navigator } = Tab

const DriverNavigator = () =>
    <DriverProvider>
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
            <Screen
                name='TasksScreen'
                component={TasksScreen}
                options={{ title: 'Tasks' }}
            />
            <Screen
                name='SingleTaskScreen'
                component={SingleTaskScreen}
                options={{ title: 'Task' }}
            />
        </Navigator>
    </DriverProvider>

export default DriverNavigator