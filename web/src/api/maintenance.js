import api from 'api'

export const getAllByMaintainer = async maintainerId =>
    await new Promise(async (resolve, reject) => {
        try {
            const response = await api.get(`maintenance/get/all/${maintainerId}`)
            const { success, message, maintenances } = response.data

            if (success) resolve(maintenances)
            else reject(message)
        } catch (err) {
            reject(err.message)
        }
    })