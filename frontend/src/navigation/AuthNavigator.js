import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from 'screens/auth'

const Stack = createNativeStackNavigator()
const { Screen, Navigator } = Stack

const AuthNavigator = () =>
    <Navigator
        initialRouteName='AuthScreen'
    >
        <Screen
            name='AuthScreen'
            component={AuthScreen}
            options={{ title: 'Authorization' }}
        />
    </Navigator>

export default AuthNavigator