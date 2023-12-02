import React, {
    createContext,
    useContext
} from 'react'

import { useAuth } from 'context'
import {
    getByDriver as getTasksByDriverAPI,
    getById as getTaskByIdAPI
} from 'api/task'

const DriverContext = createContext()
const { Provider } = DriverContext

const DriverProvider = ({ children }) => {
    const { webToken } = useAuth()

    const getTasksByDriver = async () => {
        console.log('getting tasks...')
        return getTasksByDriverAPI(webToken)
    }
    const getTaskById = async id => {
        console.log('getting task...')
        return getTaskByIdAPI(id)
    }

    return (
        <Provider
            value={{
                getTasksByDriver, getTaskById
            }}
        >{children}</Provider>
    )
}

export default DriverProvider
export const useDriver = () => useContext(DriverContext)