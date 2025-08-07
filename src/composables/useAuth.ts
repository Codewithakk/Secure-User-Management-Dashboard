import { useAuthStore } from '../stores/auth.store'
import { useRouter } from 'react-router-dom'
import { computed } from 'react'

export const useAuth = () => {
    const authStore = useAuthStore()
    const router = useRouter()

    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const user = computed(() => authStore.user)
    const loading = computed(() => authStore.loading)
    const error = computed(() => authStore.error)

    const login = async (email: string, password: string) => {
        try {
            await authStore.login(email, password)
            router.push('/')
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    const register = async (email: string, password: string) => {
        try {
            await authStore.register(email, password)
            router.push('/')
        } catch (error) {
            console.error('Registration failed:', error)
        }
    }

    const logout = () => {
        authStore.logout()
        router.push('/signin')
    }

    return {
        isAuthenticated,
        user,
        loading,
        error,
        login,
        register,
        logout
    }
}