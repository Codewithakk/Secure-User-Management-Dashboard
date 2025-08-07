// src/services/api.ts
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://reqres.in/api',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',  // ✅ Required header
    },
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add auth tokens or other headers here if needed
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response.data
    },
    (error) => {
        // Handle errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error:', error.response.status, error.response.data)
            return Promise.reject({
                status: error.response.status,
                message: error.response.data?.error || 'An error occurred',
            })
        } else if (error.request) {
            // The request was made but no response was received
            console.error('API Error: No response received', error.request)
            return Promise.reject({
                status: null,
                message: 'No response from server',
            })
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('API Error:', error.message)
            return Promise.reject({
                status: null,
                message: error.message,
            })
        }
    }
)

export default api