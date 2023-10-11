import React from 'react'

import { useAuth } from 'context'
import { NavigationContainer } from '@react-navigation/native'

import AuthNavigator from 'navigation/AuthNavigator'
import AdminNavigator from 'navigation/AdminNavigator'
import DriverNavigator from 'navigation/DriverNavigator'

const RootNavigation = () => {
    const { loggedIn, user } = useAuth()

    const Navigator = loggedIn ?
        getAuthorizedNavigator(user.role) : AuthNavigator

    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    )
}

const getAuthorizedNavigator = role => {
    switch (role) {
        case 'driver': return DriverNavigator
        case 'admin': return AdminNavigator
        default: return AuthNavigator

    }
}

export default RootNavigation