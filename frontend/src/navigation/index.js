import React from 'react'

import { useAuth } from 'context'
import { NavigationContainer } from '@react-navigation/native'

import AuthNavigator from 'navigation/AuthNavigator'
import AdminNavigator from 'navigation/AdminNavigator'
import DriverNavigator from 'navigation/DriverNavigator'
import FuelerNavigator from 'navigation/FuelerNavigator'
import MaintainerNavigator from 'navigation/MaintainerNavigator'

import { ROLES } from 'utils/constants'

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
        case ROLES.admin: return AdminNavigator
        case ROLES.driver: return DriverNavigator
        case ROLES.fueler: return FuelerNavigator
        case ROLES.maintainer: return MaintainerNavigator
        default: return AuthNavigator

    }
}

export default RootNavigation