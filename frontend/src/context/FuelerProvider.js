import React, {
    createContext,
    useContext
} from 'react'

import {
    getAll as getAllVehiclesAPI
} from 'api/vehicle'
import {
    create as createFuelingAPI
} from 'api/fueling'
import { useAuth } from 'context'

const FuelerContext = createContext()
const { Provider } = FuelerContext

const FuelerProvider = ({ children }) => {
    const { webToken } = useAuth()

    const getAllVehicles = async () => {
        console.log('getting all vehicles...')
        return getAllVehiclesAPI()
    }
    const createFueling = async fueling => {
        console.log('creating a fueling...')
        return createFuelingAPI(webToken, fueling)
    }

    return (
        <Provider
            value={{ getAllVehicles, createFueling }}
        >{children}</Provider>
    )
}

export default FuelerProvider
export const useFueler = () => useContext(FuelerContext)