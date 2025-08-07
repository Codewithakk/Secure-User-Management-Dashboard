import { create } from 'zustand'
import { userService } from '../services/userService'

interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

interface UserState {
    users: User[]
    currentUser: User | null
    loading: boolean
    error: string | null
    fetchUsers: (page?: number) => Promise<void>
    fetchUser: (id: number) => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    fetchUsers: async (page = 1) => {
        set({ loading: true, error: null })
        try {
            const response = await userService.getUsers(page)
            set({ users: response.data, loading: false })
        } catch (error) {
            set({ error: 'Failed to fetch users', loading: false })
            throw error
        }
    },
    fetchUser: async (id) => {
        set({ loading: true, error: null })
        try {
            const response = await userService.getUser(id)
            set({ currentUser: response.data, loading: false })
        } catch (error) {
            set({ error: 'Failed to fetch user', loading: false })
            throw error
        }
    },
}))