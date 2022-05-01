import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://random-data-api.com/api/',
    headers: {
        'content-type': 'application/json;charset=utf-8'
    }
})
