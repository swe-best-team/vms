import axios from 'axios'

export const baseURL = 'http://13.49.54.238/'
// use ipconfig in cmd

export default axios.create({ baseURL })