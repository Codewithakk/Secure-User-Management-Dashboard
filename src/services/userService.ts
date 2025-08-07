import api from './api'

interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

interface UsersResponse {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: User[]
}

interface SingleUserResponse {
    data: User
}

interface ErrorResponse {
    error: string
}

export const userService = {
    /**
     * Fetches a paginated list of users
     * @param page - Page number (default: 1)
     * @returns Promise with users data or throws error
     */
    getUsers: async (page = 1): Promise<UsersResponse> => {
        try {
            const response = await api.get<UsersResponse>(`/users?page=${page}`)
            return response
        } catch (error) {
            console.error('Failed to fetch users:', error)
            throw new Error(
                (error as ErrorResponse)?.error || 'Failed to fetch users. Please try again.'
            )
        }
    },

    /**
     * Fetches a single user by ID
     * @param id - User ID
     * @returns Promise with user data or throws error
     */
    getUser: async (id: number): Promise<SingleUserResponse> => {
        try {
            const response = await api.get<SingleUserResponse>(`/users/${id}`)
            return response
        } catch (error) {
            console.error(`Failed to fetch user ${id}:`, error)
            throw new Error(
                (error as ErrorResponse)?.error || `Failed to fetch user ${id}. Please try again.`
            )
        }
    },

    /**
     * Creates a new user (simulated - won't persist on reqres.in)
     * @param userData - User data to create
     * @returns Promise with created user data
     */
    createUser: async (userData: Omit<User, 'id'> & { job: string }): Promise<{ id: string; createdAt: string }> => {
        try {
            const response = await api.post<{ id: string; createdAt: string }>('/users', userData)
            return response
        } catch (error) {
            console.error('Failed to create user:', error)
            throw new Error(
                (error as ErrorResponse)?.error || 'Failed to create user. Please try again.'
            )
        }
    },

    /**
     * Updates a user (simulated - won't persist on reqres.in)
     * @param id - User ID to update
     * @param userData - Updated user data
     * @returns Promise with updated user data
     */
    updateUser: async (id: number, userData: Partial<User> & { job?: string }): Promise<{ updatedAt: string }> => {
        try {
            const response = await api.put<{ updatedAt: string }>(`/users/${id}`, userData)
            return response
        } catch (error) {
            console.error(`Failed to update user ${id}:`, error)
            throw new Error(
                (error as ErrorResponse)?.error || `Failed to update user ${id}. Please try again.`
            )
        }
    },

    /**
     * Deletes a user (simulated - won't persist on reqres.in)
     * @param id - User ID to delete
     * @returns Promise that resolves on success
     */
    deleteUser: async (id: number): Promise<void> => {
        try {
            await api.delete(`/users/${id}`)
        } catch (error) {
            console.error(`Failed to delete user ${id}:`, error)
            throw new Error(
                (error as ErrorResponse)?.error || `Failed to delete user ${id}. Please try again.`
            )
        }
    },
}