import api from 'api'

export const login = async (email, password) =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.post('user/login', { email, password })
            const { success, message, ...data } = response.data

            if (success) resolve(data)
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })

export const authenticate = async jwt =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.post('user/authenticate', {}, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
            const { success, message, ...data } = response.data

            if (success) resolve(data)
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })

export const create = async (jwt, user) =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.post('user/create', user, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
            const { success, message } = response.data

            if (success) resolve()
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })

export const logout = async jwt =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.post('user/logout', {}, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
            const { success, message } = response.data

            if (success) resolve()
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })

export const getAll = async () =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.get('user/get/all')
            const { success, users, message } = response.data

            if (success) resolve(users)
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })

export const getAllDrivers = async () =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.get('user/get/all/drivers')
            const { success, drivers, message } = response.data

            if (success) resolve(drivers)
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })

export const remove = async (jwt, _id) =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.delete('user/delete', { _id }, {
                headers: { Authorization: `Bearer ${jwt}` },
            })
            const { success, message } = response.data

            if (success) resolve()
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })