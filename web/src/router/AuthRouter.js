import React from 'react'

import { createBrowserRouter } from 'react-router-dom'

import AuthScreen from 'screens/auth'

const AuthRouter = createBrowserRouter([
    {
        path: '/', element: <AuthScreen />
    }
])

export default AuthRouter