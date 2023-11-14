import React from 'react'
import api from 'api'

export const getAllByDriver = async driverId =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.get(`vehicle/get/all/${driverId}`)
            const { success, vehicles, message } = response.data

            if (success) resolve(vehicles)
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })

module.exports = { getAllByDriver }