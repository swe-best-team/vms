import React from 'react'

import { useAuth } from 'context'

import { RouterProvider } from 'react-router-dom'

import AuthRouter from 'router/AuthRouter'
import AdminRouter from 'router/AdminRouter'

const RootRouter = () => {
    const { loggedIn, user } = useAuth()

    const router = loggedIn
        ? getAuthorizedRouter(user?.role)
        : AuthRouter

    return <RouterProvider router={router} />
}

const getAuthorizedRouter = role => {
    switch (role) {
        case 'admin': return AdminRouter
        default: return AuthRouter
    }
}

export default RootRouter