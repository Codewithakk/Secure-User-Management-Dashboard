import React from 'react'

interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

interface UserCardProps {
    user: User
    onClick: () => void
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
    return (
        <div
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onClick}
        >
            <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-16 h-16 rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold text-center">
                {user.first_name} {user.last_name}
            </h3>
            <p className="text-gray-600 text-center">{user.email}</p>
        </div>
    )
}

export default UserCard