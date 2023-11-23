import React, {
    createContext,
    useContext
} from 'react'

import { useAuth } from 'context'
import {
    getByDriver as getTasksByDriverAPI
} from 'api/task'

const DriverContext = createContext()
const { Provider } = DriverContext

const DriverProvider = ({ children }) => {
    const { webToken } = useAuth()

    const getTasksByDriver = async () => {
        console.log('getting tasks...')
        return getTasksByDriverAPI(webToken)
    }

    return (
        <Provider
            value={{
                getTasksByDriver
            }}
        >{children}</Provider>
    )
}

export default DriverProvider
export const useDriver = () => useContext(DriverContext)