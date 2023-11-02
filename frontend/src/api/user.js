import React from 'react'
import api from 'api'

export const login = async (email, password) =>
    await new Promise(async (resolve, reject) => {
        console.log('logging in...')

        const response = await api.post('user/login', { email, password })
        const { success, message, ...data } = response.data

        if (success) resolve(data)
        else reject(message)
    })

export const authenticate = async (jwtToken) =>
    await new Promise(async (resolve, reject) => {
        console.log('authenticating...')

        const response = await api.post('user/authenticate', {}, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        const { success, message, ...data } = response.data

        if (success) resolve(data)
        else reject(message)
    })

export const create = async (jwtToken, user) =>
    await new Promise(async (resolve, reject) => {
        console.log('creating a new user...')

        const response = await api.put('user/create', { ...user }, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        const { success, message } = response.data

        if (success) resolve()
        else reject(message)
    })

export const logout = async (jwtToken) =>
    await new Promise(async (resolve, reject) => {
        console.log('logging out...')

        const response = await api.post('user/logout', {}, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        const { success, message } = response.data

        if (success) resolve()
        else reject(message)
    })

export const getAll = async jwtToken =>
    await new Promise(async (resolve, reject) => {
        console.log('getting all users...')

        const response = await api.get('user/get/all')
        const { success, users, message } = response.data

        if (success) resolve(users)
        else reject(message)
    })

export const remove = async (jwtToken, _id) =>
    await new Promise(async (resolve, reject) => {
        console.log('removing...')

        const response = await api.delete('user/delete', { _id }, {
            headers: { Authorization: `Bearer ${jwtToken}` },
        })
        const { success, message } = response.data
        if (success) resolve()
        else reject(message)
    })