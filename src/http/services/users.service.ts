import api from '../api'

export const UsersService = {
    getUsers: async (page: number = 1) => {
        const response = await api.get(`/users?page=${page}`)
        return response.data
    },
    getUserById: async (id: number) => {
        const response = await api.get(`/users/${id}`)
        return response.data
    }
}