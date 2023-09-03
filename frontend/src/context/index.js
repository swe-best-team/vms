import React from 'react'

import AuthProvider, { useAuth } from 'context/AuthProvider'

const MainProvider = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default MainProvider
export { useAuth }