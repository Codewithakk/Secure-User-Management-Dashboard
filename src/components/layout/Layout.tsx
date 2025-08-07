import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { useAuth } from '../../composables/useAuth'

const Layout: React.FC = () => {
    const { isAuthenticated, logout } = useAuth()

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {isAuthenticated && <Header onLogout={logout} />}
            <main
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '2rem 1rem',
                }}
            >
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
