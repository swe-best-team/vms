import React from 'react'
import api from 'api'

const getVehicles = async url =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.get(url)
            const { success, vehicles, message } = response.data

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