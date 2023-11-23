import axios from 'axios'

export const baseURL = 'http://13.49.222.127:3000/'
// use ipconfig for mac or ipconfig for windows in cmd

export default axios.create({ baseURL })