import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from 'screens/auth'

const Stack = createNativeStackNavigator()
const { Screen, Navigator } = Stack

const AuthNavigator = () =>
    <Navigator
        initialRouteName='LoginScreen'
    >
        <Screen
            name='LoginScreen'
            component={LoginScreen}
            options={{ title: 'Authorization' }}
        />
    </Navigator>

export default AuthNavigator