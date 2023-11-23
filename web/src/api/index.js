import axios from 'axios'

export const baseURL = 'http://13.49.222.127:3000/'
// use ipconfig in cmd

export default axios.create({ baseURL })