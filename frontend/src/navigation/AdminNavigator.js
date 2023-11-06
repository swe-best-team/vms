import React from 'react'

import AdminProvider from 'context/AdminProvider'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AdminScreen from 'screens/admin'
import CreateUserScreen from 'screens/admin/CreateUserScreen'

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
        </Navigator>
    </AdminProvider>

export default AdminNavigator