import React, {
    createContext,
    useContext
} from 'react'

import { getAll as getAllVehiclesAPI } from 'api/vehicle'

const MaintainerContext = createContext()
const { Provider } = MaintainerContext

const MaintainerProvider = ({ children }) => {
    const getAllVehicles = async () => {
        console.log('getting all vehicles...')
        return getAllVehiclesAPI()
    }
    const getAllVehiclesByDriver = async driverId => {
        console.log('getting all vehicles by driver...')
        return getAllVehiclesByDriverAPI(driverId)
    }

    return (
        <Provider
            value={{ getAllVehicles }}
        >{children}</Provider>
    )
}

export default MaintainerProvider
export const useMaintainer = () => useContext(MaintainerContext)