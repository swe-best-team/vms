import api from 'api'

const getVehicles = async url =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.get(url)
            const { success, message, vehicles } = response.data

            if (success) resolve(vehicles)
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })

export const getAllByDriver = async driverId =>
    getVehicles(`vehicle/get/all/${driverId}`)

export const getAll = async () =>
    getVehicles('vehicle/get/all/')

export const createByAdmin = async (jwt, vehicle) =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.post('vehicle/create/admin', vehicle, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
            const { success, message } = response.data

            if (success) resolve()
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })