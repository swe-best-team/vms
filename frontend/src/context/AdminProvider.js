import React, {
    createContext,
    useContext,
    useState
} from 'react'

import { useAuth } from 'context/AuthProvider'
import { create as createAPI } from 'api/user'

const AdminContext = createContext()
const { Provider } = AdminContext

const AdminProvider = ({ children }) => {
    const { webToken } = useAuth()
    const createUser = async user => {
        console.log('creating a new user...')
        return createAPI(webToken, user)
    }

    return (
        <Provider
            value={{
                createUser
            }}
        >{children}</Provider>
    )
}

export default AdminProvider
export const useAdmin = () => useContext(AdminContext)