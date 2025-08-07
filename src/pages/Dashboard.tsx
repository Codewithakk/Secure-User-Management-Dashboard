import React, { useEffect } from 'react'
import Button from '~/components/common/Button'
import { useAuthStore } from '~/stores/auth.store'
import { useUserStore } from '~/stores/users.store'

const Dashboard: React.FC = () => {
    const { user, logout } = useAuthStore()
    const { users, fetchUsers, loading, error } = useUserStore()

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
            {/* Navbar */}
            <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>User Dashboard</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '16px', color: '#4a5568' }}>{user?.email}</span>
                        <Button variant="danger" onClick={logout}>
                            Sign out
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div style={{ padding: '40px 20px' }}>
                <header style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px' }}>Users</h2>
                </header>

                <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {loading && (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <p>Loading users...</p>
                        </div>
                    )}

                    {error && (
                        <div style={{ backgroundColor: '#fed7d7', borderLeft: '4px solid #f56565', padding: '16px', marginBottom: '16px', borderRadius: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <svg
                                    style={{ height: '20px', width: '20px', color: '#c53030', marginRight: '8px' }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p style={{ color: '#c53030', fontSize: '14px' }}>{error}</p>
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                        {users.map((user) => (
                            <div
                                key={user.id}
                                style={{
                                    backgroundColor: '#fff',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    padding: '20px',
                                    transition: 'transform 0.2s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={user.avatar}
                                        alt={`${user.first_name} ${user.last_name}`}
                                        style={{ height: '48px', width: '48px', borderRadius: '50%', marginRight: '16px' }}
                                    />
                                    <div>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d3748' }}>
                                            {user.first_name} {user.last_name}
                                        </h3>
                                        <p style={{ fontSize: '14px', color: '#718096', marginTop: '4px' }}>{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
