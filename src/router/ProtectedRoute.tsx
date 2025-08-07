import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth.store'

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuthStore()

    if (!user) {
        return <Navigate to="/signin" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute