import { authService } from '@/services/authService'
import { useAuthStore } from '@/stores/auth.store'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../services/authService')

describe('authStore', () => {
    beforeEach(() => {
        // Reset the store before each test
        useAuthStore.setState({
            user: null,
            loading: false,
            error: null,
        })
    })

    describe('login', () => {
        it('should set user on successful login', async () => {
            const mockCredentials = { email: 'test@example.com', password: 'password' }
            const mockResponse = { token: 'mock-token' }

            vi.mocked(authService.login).mockResolvedValue(mockResponse)

            await useAuthStore.getState().login(mockCredentials.email, mockCredentials.password)

            expect(useAuthStore.getState().user).toEqual({
                email: mockCredentials.email,
                token: mockResponse.token,
            })
            expect(useAuthStore.getState().loading).toBe(false)
            expect(useAuthStore.getState().error).toBeNull()
        })

        it('should set error on failed login', async () => {
            const mockCredentials = { email: 'test@example.com', password: 'wrong' }
            const mockError = new Error('Login failed')

            vi.mocked(authService.login).mockRejectedValue(mockError)

            await expect(
                useAuthStore.getState().login(mockCredentials.email, mockCredentials.password)
            ).rejects.toThrow()

            expect(useAuthStore.getState().user).toBeNull()
            expect(useAuthStore.getState().loading).toBe(false)
            expect(useAuthStore.getState().error).toBe('Invalid email or password')
        })
    })

    describe('logout', () => {
        it('should clear user data', () => {
            useAuthStore.setState({
                user: { email: 'test@example.com', token: 'mock-token' },
            })

            useAuthStore.getState().logout()

            expect(useAuthStore.getState().user).toBeNull()
        })
    })
})