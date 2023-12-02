import React, {
    createContext,
    useContext
} from 'react'

import { useAuth } from 'context'
import {
    create as createUserAPI,
    getAllDrivers as getAllDriversAPI
} from 'api/user'
import {
    getAllByDriver as getAllVehiclesByDriverAPI
} from 'api/vehicle'
import { create as createTaskAPI } from 'api/task'

const AdminContext = createContext()
const { Provider } = AdminContext

const AdminProvider = ({ children }) => {
    const { webToken } = useAuth()

    const createUser = async user => {
        console.log('creating a new user...')
        return createUserAPI(webToken, user)
    }
    const getAllDrivers = async () => {
        console.log('getting all drivers...')
        return getAllDriversAPI()
    }
    const getAllVehiclesByDriver = async driverId => {
        console.log('getting all vehicles by driver...')
        return getAllVehiclesByDriverAPI(driverId)
    }
    const createTask = async task => {
        console.log('creating a new task...')
        return createTaskAPI(webToken, task)
    }

    return (
        <Provider
            value={{
                createUser, getAllDrivers,
                getAllVehiclesByDriver, createTask
            }}
        >{children}</Provider>
    )
}

export default AdminProvider
export const useAdmin = () => useContext(AdminContext)