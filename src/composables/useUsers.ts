import { useUsersStore } from '../stores/users.store'
import { computed } from 'react'

export const useUsers = () => {
    const usersStore = useUsersStore()

    const users = computed(() => usersStore.users)
    const currentPage = computed(() => usersStore.currentPage)
    const totalPages = computed(() => usersStore.totalPages)
    const loading = computed(() => usersStore.loading)
    const error = computed(() => usersStore.error)
    const selectedUser = computed(() => usersStore.selectedUser)

    const fetchUsers = async (page: number = 1) => {
        await usersStore.fetchUsers(page)
    }

    const fetchUserById = async (id: number) => {
        await usersStore.fetchUserById(id)
    }

    return {
        users,
        currentPage,
        totalPages,
        loading,
        error,
        selectedUser,
        fetchUsers,
        fetchUserById
    }
}