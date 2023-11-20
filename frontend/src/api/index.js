import axios from 'axios'

export const baseURL = 'http://localhost:3000/'
// use ipconfig for mac or ipconfig for windows in cmd

export default axios.create({ baseURL })