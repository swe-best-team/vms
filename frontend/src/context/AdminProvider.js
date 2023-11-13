import React, {
    createContext,
    useContext,
    useState
} from 'react'

import { useAuth } from 'context/AuthProvider'
import {
    create as createAPI,
    getAllDrivers as getAllDriversAPI
} from 'api/user'

const AdminContext = createContext()
const { Provider } = AdminContext

const AdminProvider = ({ children }) => {
    const { webToken } = useAuth()
    const createUser = async user => {
        console.log('creating a new user...')
        return createAPI(webToken, user)
    }
    const getAllDrivers = async () => {
        console.log('getting all drivers...')
        return getAllDriversAPI()
    }

    return (
        <Provider
            value={{
                createUser, getAllDrivers
            }}
        >{children}</Provider>
    )
}

export default AdminProvider
export const useAdmin = () => useContext(AdminContext)