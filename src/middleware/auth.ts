import { useAuthStore } from '../stores/auth.store'

export default async function authMiddleware() {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
        const token = localStorage.getItem('token')
        if (token) {
            authStore.initializeAuth()
            if (authStore.isAuthenticated) {
                return null
            }
        }
        window.location.href = '/signin'
        return new Promise(() => { }) // Never resolve to prevent navigation
    }

    return null
}