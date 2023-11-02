import axios from 'axios'

export const baseURL = 'http://127.0.0.1:3000/' // http://{ipv4}:8001
// use ipconfig in cmd

export default axios.create({ baseURL })