import React from 'react'

import { useAuth } from 'context'
import { NavigationContainer } from '@react-navigation/native'

import AuthNavigator from 'navigation/AuthNavigator'
import AdminNavigator from 'navigation/AdminNavigator'
import DriverNavigator from 'navigation/DriverNavigator'
import FuelerNavigator from 'navigation/FuelerNavigator'

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
        case 'admin': return AdminNavigator
        case 'driver': return DriverNavigator
        case 'fueler': return FuelerNavigator
        default: return AuthNavigator

    }
}

export default RootNavigation