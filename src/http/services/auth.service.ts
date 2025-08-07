import api from '../api'
import { LoginPayload, RegisterPayload } from '../../types'

export const AuthService = {
    login: async (payload: LoginPayload) => {
        const response = await api.post('/login', payload)
        return response.data
    },
    register: async (payload: RegisterPayload) => {
        const response = await api.post('/register', payload)
        return response.data
    },
    logout: async () => {
        // In a real app, you would call an API endpoint to invalidate the token
        localStorage.removeItem('token')
    }
}