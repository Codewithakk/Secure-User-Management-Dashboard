import { useAuthStore } from '../../stores/auth.store'
import { AuthService } from '../../http/services/auth.service'
import { vi } from 'vitest'

describe('AuthStore', () => {
    beforeEach(() => {
        // Reset the store before each test
        useAuthStore().$reset()
        vi.resetAllMocks()
    })

    describe('login', () => {
        it('should set isAuthenticated to true on successful login', async () => {
            const mockResponse = { token: 'test-token' }
            vi.spyOn(AuthService, 'login').mockResolvedValue(mockResponse)

            const authStore = useAuthStore()
            await authStore.login('test@example.com', 'password')

            expect(authStore.isAuthenticated).toBe(true)
            expect(authStore.user).toEqual({ email: 'test@example.com' })
            expect(localStorage.getItem('token')).toBe('test-token')
        })

        it('should set error on failed login', async () => {
            vi.spyOn(AuthService, 'login').mockRejectedValue(new Error('Login failed'))

            const authStore = useAuthStore()
            await expect(authStore.login('test@example.com', 'wrong')).rejects.toThrow()

            expect(authStore.error).toBe('Invalid email or password')
            expect(authStore.isAuthenticated).toBe(false)
        })
    })

    describe('initializeAuth', () => {
        it('should set isAuthenticated to true if token exists', () => {
            localStorage.setItem('token', 'test-token')

            const authStore = useAuthStore()
            authStore.initializeAuth()

            expect(authStore.isAuthenticated).toBe(true)
        })

        it('should not set isAuthenticated if no token exists', () => {
            localStorage.removeItem('token')

            const authStore = useAuthStore()
            authStore.initializeAuth()

            expect(authStore.isAuthenticated).toBe(false)
        })
    })
})