import { AuthService } from '../../http/services/auth.service'
import api from '../../http/api'
import { vi } from 'vitest'

describe('AuthService', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    describe('login', () => {
        it('should make a POST request to /login', async () => {
            const mockResponse = { token: 'test-token' }
            vi.spyOn(api, 'post').mockResolvedValue({ data: mockResponse })

            const payload = { email: 'test@example.com', password: 'password' }
            const response = await AuthService.login(payload)

            expect(api.post).toHaveBeenCalledWith('/login', payload)
            expect(response).toEqual(mockResponse)
        })
    })

    describe('register', () => {
        it('should make a POST request to /register', async () => {
            const mockResponse = { token: 'test-token' }
            vi.spyOn(api, 'post').mockResolvedValue({ data: mockResponse })

            const payload = { email: 'test@example.com', password: 'password' }
            const response = await AuthService.register(payload)

            expect(api.post).toHaveBeenCalledWith('/register', payload)
            expect(response).toEqual(mockResponse)
        })
    })

    describe('logout', () => {
        it('should remove token from localStorage', () => {
            Storage.prototype.removeItem = vi.fn()
            AuthService.logout()
            expect(localStorage.removeItem).toHaveBeenCalledWith('token')
        })
    })
})