import axios from 'axios'

export const baseURL = 'http://192.168.1.173:3000/'
// use ipconfig in cmd

export default axios.create({ baseURL })