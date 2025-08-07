export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

export interface AuthState {
    user: { email: string } | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
}

export interface UsersState {
    users: User[]
    currentPage: number
    totalPages: number
    loading: boolean
    error: string | null
    selectedUser: User | null
}

export interface LoginPayload {
    email: string
    password: string
}

export interface RegisterPayload {
    email: string
    password: string
}

export interface ApiResponse<T> {
    data: T
    page?: number
    per_page?: number
    total?: number
    total_pages?: number
    support?: {
        url: string
        text: string
    }
}