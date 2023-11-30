import React, {
    createContext,
    useContext
} from 'react'

import { useAuth } from 'context/AuthProvider'

import { Outlet } from 'react-router-dom'

import {
    create as createUserAPI,
    getAllDrivers as getAllDriversAPI,
    getAll as getAllUsersAPI,
    remove as removeUserAPI
} from 'api/user'
import {
    getAllByDriver as getAllVehiclesByDriverAPI,
    createByAdmin as createVehicleAPI
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
    const createVehicle = async vehicle => {
        console.log('creating a new vehicle...')
        return createVehicleAPI(webToken, vehicle)
    }
    const getAllUsers = async () => {
        console.log('getting all users...')
        return getAllUsersAPI()
    }
    const removeUser = async userId => {
        console.log('removing user...')
        return removeUserAPI(webToken, userId)
    }

    return (
        <Provider
            value={{
                createUser, getAllDrivers,
                getAllVehiclesByDriver, createTask,
                createVehicle, getAllUsers, removeUser
            }}
        >
            <Outlet />
        </Provider>
    )
}

export default AdminProvider
export const useAdmin = () => useContext(AdminContext)