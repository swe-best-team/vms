import React from 'react'

import AuthProvider, { useAuth } from 'context/AuthProvider'
import AlertProvider, { useAlert } from 'context/AlertProvider'

const MainProvider = ({ children }) => {
    return (
        <AlertProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </AlertProvider>
    )
}

export default MainProvider
export { useAuth, useAlert }