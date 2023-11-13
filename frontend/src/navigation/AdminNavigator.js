import React from 'react'

import AdminProvider from 'context/AdminProvider'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AdminScreen from 'screens/admin'
import CreateUserScreen from 'screens/admin/CreateUserScreen'
import CreateTaskScreen from 'screens/admin/CreateTaskScreen'

const Tab = createNativeStackNavigator()
const { Screen, Navigator } = Tab

const AdminNavigator = () =>
    <AdminProvider>
        <Navigator
            initialRouteName='AdminScreen'
        >
            <Screen
                name='AdminScreen'
                component={AdminScreen}
                options={{ title: 'Admin' }}
            />
            <Screen
                name='CreateUserScreen'
                component={CreateUserScreen}
                options={{ title: 'Create a user' }}
            />
            <Screen
                name='CreateTaskScreen'
                component={CreateTaskScreen}
                options={{ title: 'Create a task' }}
            />
        </Navigator>
    </AdminProvider>

export default AdminNavigator