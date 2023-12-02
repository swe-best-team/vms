import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react'

import { getAll as getAllVehiclesAPI } from 'api/vehicle'

const FuelerContext = createContext()
const { Provider } = FuelerContext

const FuelerProvider = ({ children }) => {
    const getAllVehicles = async () => {
        console.log('getting all vehicles...')
        return getAllVehiclesAPI()
    }

    return (
        <Provider
            value={{ getAllVehicles }}
        >{children}</Provider>
    )
}

export default FuelerProvider
export const useFueler = () => useContext(FuelerContext)