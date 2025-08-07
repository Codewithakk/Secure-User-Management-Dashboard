import React from 'react'
import { Button } from '../common/Button'

interface HeaderProps {
    onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    return (
        <header
            style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h1
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#1f2937',
                    }}
                >
                    User Dashboard
                </h1>
                <Button variant="danger" onClick={onLogout}>
                    Logout
                </Button>
            </div>
        </header>
    )
}

export default Header
