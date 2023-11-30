import axios from 'axios'

export const baseURL = 'http://localhost:3000/'
// use ipconfig in cmd

export default axios.create({ baseURL })