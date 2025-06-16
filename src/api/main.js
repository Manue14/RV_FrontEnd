import axios from 'axios'
import { CONSTANTS } from '@/constants/constants'

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 900000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

axiosInstance.interceptors.request.use(function (config) {
    console.log('Enviando petición a:', config.url)
    return config
}, function (error) {
    console.error("Error en la petición:", error)
    return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) {
    console.log('Respuesta recibida:', response.status)
    return response
}, function (error) {
    if (error.response) {
        console.error("Error en la respuesta:", error.response.status, error.response.data)
    } else if (error.request) {
        console.error("No se recibió respuesta:", error.request)
    } else {
        console.error("Error en la configuración:", error.message)
    }
    return Promise.reject(error)
})

export default axiosInstance