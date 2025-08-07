import api from './api'

interface LoginCredentials {
    email: string
    password: string
}

interface RegisterCredentials {
    email: string
    password: string
}

interface AuthResponse {
    token: string
    id?: string
}

interface ErrorResponse {
    error: string
}

export const authService = {
    /**
     * Logs in a user with provided credentials
     * @param credentials - Email and password
     * @returns Promise with token or throws error
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await api.post<AuthResponse>('/login', credentials)
            console.log('Login successful:', response.data)
            return response // ✅ This works because interceptor returns response.data
        } catch (error: any) {
            console.error('Login failed:', error)
            // Check for Axios error response
            const apiError = error?.response?.data?.error
            throw new Error(
                apiError || error.message || 'Login failed. Please try again.'
            )
        }
    },

    /**
     * Registers a new user
     * @param credentials - Email and password
     * @returns Promise with token or throws error
     */
    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        try {
            // Test credentials that work with reqres.in:
            // email: 'eve.holt@reqres.in'
            // password: 'pistol'
            const response = await api.post<AuthResponse>('/register', credentials)
            console.log('Registration successful:', response.data)
            return response

        } catch (error) {
            console.error('Registration failed:', error)
            throw new Error(
                (error as ErrorResponse)?.error || 'Registration failed. Please try again.'
            )
        }
    },
}