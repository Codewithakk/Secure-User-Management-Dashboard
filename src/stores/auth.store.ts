import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../services/authService'

interface AuthState {
    user: { email: string; token: string } | null
    loading: boolean
    error: string | null
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,
            login: async (email, password) => {
                set({ loading: true, error: null })
                try {
                    const response = await authService.login({ email, password })
                    set({ user: { email, token: response.token }, loading: false, error: null }) // ✅ CLEAR ERROR
                } catch (error) {
                    set({ error: 'Invalid email or password', loading: false, user: null }) // ✅ also clear user on fail
                    throw error
                }
            },
            register: async (email, password) => {
                set({ loading: true, error: null })
                try {
                    const response = await authService.register({ email, password })
                    set({ user: { email, token: response.token }, loading: false })
                } catch (error) {
                    set({ error: 'Registration failed', loading: false })
                    throw error
                }
            },
            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
)