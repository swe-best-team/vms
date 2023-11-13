import React from "react"
import api from 'api'

export const create = async (jwt, task) =>
    await new Promise(async (resolve, reject) => {
        const response = await api.post('task/create', task, {
            headers: { Authorization: `Bearer ${jwt}` }
        })
        const { success, message } = response.data

        if (success) resolve()
        else reject(message)
    })