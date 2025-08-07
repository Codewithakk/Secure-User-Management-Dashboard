import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../../composables/useAuth'
import { useAuthStore } from '../../stores/auth.store'
import { vi } from 'vitest'

// Mock the router
vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
    Link: () => null
}))

describe('useAuth', () => {
    beforeEach(() => {
        useAuthStore().$reset()
        vi.resetAllMocks()
    })

    it('should return initial auth state', () => {
        const { result } = renderHook(() => useAuth())

        expect(result.current.isAuthenticated).toBe(false)
        expect(result.current.user).toBeNull()
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBeNull()
    })

    it('should call login from store', async () => {
        const mockLogin = vi.fn()
        useAuthStore().login = mockLogin

        const { result } = renderHook(() => useAuth())

        await act(async () => {
            await result.current.login('test@example.com', 'password')
        })

        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password')
    })
})