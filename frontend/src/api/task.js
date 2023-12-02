import React from "react"
import api from 'api'

export const create = async (jwt, task) =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.post('task/create', task, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
            const { success, message } = response.data

            if (success) resolve()
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })

export const getByDriver = async jwt =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.post('task/get/all', {}, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
            const { success, message, tasks } = response.data

            if (success) resolve(tasks)
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })

export const getById = async id =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.get(`task/get/${id}`)
            const { success, message, task } = response.data

            if (success) resolve(task)
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })