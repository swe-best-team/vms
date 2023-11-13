import React from 'react'

import AuthProvider, { useAuth } from 'context/AuthProvider'
import AlertProvider from './AlertProvider'

const MainProvider = ({ children }) => {
    return (
        <AuthProvider>
            <AlertProvider>
                {children}
            </AlertProvider>
        </AuthProvider>
    )
}

export default MainProvider
export { useAuth }