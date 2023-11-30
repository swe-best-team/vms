import React from 'react'

import MaintainerProvider from 'context/MaintainerProvider'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import PersonalScreen from 'screens/PersonalScreen'
import DriverScreen from 'screens/driver'
import MaintainerScreen from 'screens/maintainer'
import CreateMaintenanceScreen from 'screens/maintainer/CreateMaintenanceScreen.js'
import VehicleScreen from 'screens/driver/VehicleScreen'
import TasksScreen from 'screens/driver/TasksScreen'
import SingleTaskScreen from 'screens/driver/SingleTaskScreen'


const Tab = createNativeStackNavigator()
const { Screen, Navigator } = Tab

const MaintainerNavigator = () =>
    <MaintainerProvider>
        <Navigator
            initialRouteName='MaintainerScreen'
        >
            <Screen
                name='PersonalScreen'
                component={PersonalScreen}
                options={{ title: 'Personal Info' }}
            />
            <Screen
                name='MaintainerScreen'
                component={MaintainerScreen}
                options={{ title: 'Maintainer' }}
            />
            <Screen
                name='CreateMaintenanceScreen'
                component={CreateMaintenanceScreen}
                options={{ title: 'Create a maintenance' }}
            />
        </Navigator>
    </MaintainerProvider>

export default MaintainerNavigator