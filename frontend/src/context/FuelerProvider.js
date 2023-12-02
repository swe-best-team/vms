import React, {
    createContext,
    useContext
} from 'react'

import {
    getAllDrivers as getAllDriversAPI
} from 'api/user'
import {
    getAllByDriver as getAllVehiclesByDriverAPI
} from 'api/vehicle'
import {
    create as createFuelingAPI
} from 'api/fueling'
import { useAuth } from 'context'

const FuelerContext = createContext()
const { Provider } = FuelerContext

const FuelerProvider = ({ children }) => {
    const { webToken } = useAuth()

    const getAllDrivers = async () => {
        console.log('getting all drivers...')
        return getAllDriversAPI()
    }
    const createFueling = async fueling => {
        console.log('creating a fueling...')
        return createFuelingAPI(webToken, fueling)
    }
    const getAllVehiclesByDriver = async driverId => {
        console.log('getting all vehicles by driver...')
        return getAllVehiclesByDriverAPI(driverId)
    }

    return (
        <Provider
            value={{
                createFueling,
                getAllDrivers, getAllVehiclesByDriver
            }}
        >{children}</Provider>
    )
}

export default FuelerProvider
export const useFueler = () => useContext(FuelerContext)