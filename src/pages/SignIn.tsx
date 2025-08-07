import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/stores/auth.store'
const SignIn: React.FC = () => {
    const [email, setEmail] = useState('eve.holt@reqres.in')
    const [password, setPassword] = useState('cityslicka')
    const [rememberMe, setRememberMe] = useState(false)
    const { login, loading, error } = useAuthStore()
    const navigate = useNavigate()
    const { user } = useAuthStore()

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await login(email, password)
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Welcome Back</h2>
                    <p style={styles.subtitle}>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                ...styles.input,
                                ...(error ? styles.inputError : {})
                            }}
                            placeholder="Enter your email"
                            required
                        />
                        {error && <p style={styles.errorText}>Invalid email or password</p>}
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div style={styles.rememberContainer}>
                        <div style={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={styles.checkbox}
                            />
                            <label htmlFor="remember" style={styles.rememberLabel}>Remember me</label>
                        </div>
                        <a href="#" style={styles.forgotPassword}>Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.submitButton,
                            ...(loading ? styles.loadingButton : {})
                        }}
                    >
                        {loading ? (
                            <div style={styles.loadingSpinner}>
                                <div style={styles.spinner}></div>
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div style={styles.divider}>
                    <span style={styles.dividerText}>OR</span>
                </div>

                <div style={styles.socialButtons}>
                    <button style={styles.socialButton}>
                        <svg style={styles.socialIcon} viewBox="0 0 24 24">
                            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.545,6.477,2.545,12s4.476,10,10,10c8.396,0,10-7.496,10-10c0-0.781-0.083-1.518-0.237-2.216H12.545z" />
                        </svg>
                        Continue with Google
                    </button>
                    <button style={styles.socialButton}>
                        <svg style={styles.socialIcon} viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        Continue with GitHub
                    </button>
                </div>

                <div style={styles.footer}>
                    Don't have an account? <a href="/signup" style={styles.footerLink}>Sign up</a>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px'
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        padding: '40px',
        width: '100%',
        maxWidth: '480px'
    },
    header: {
        marginBottom: '32px',
        textAlign: 'center' as const
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#2d3748',
        marginBottom: '8px'
    },
    subtitle: {
        fontSize: '16px',
        color: '#718096',
        margin: '0'
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px'
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#4a5568'
    },
    input: {
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        fontSize: '16px',
        transition: 'border-color 0.2s',
        outline: 'none',
        backgroundColor: '#f8fafc',
        color: '#1a202c'
    },
    inputError: {
        borderColor: '#f56565',
        backgroundColor: '#fff5f5'
    },
    errorText: {
        color: '#f56565',
        fontSize: '14px',
        marginTop: '4px'
    },
    rememberContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    checkbox: {
        width: '16px',
        height: '16px',
        accentColor: '#4f46e5'
    },
    rememberLabel: {
        fontSize: '14px',
        color: '#4a5568'
    },
    forgotPassword: {
        fontSize: '14px',
        color: '#4f46e5',
        textDecoration: 'none',
        fontWeight: '600'
    },
    submitButton: {
        padding: '14px',
        borderRadius: '8px',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontSize: '16px',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px'
    },
    loadingButton: {
        backgroundColor: '#a5b4fc',
        cursor: 'not-allowed'
    },
    loadingSpinner: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    spinner: {
        width: '16px',
        height: '16px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderRadius: '50%',
        borderTopColor: '#ffffff',
        animation: 'spin 1s linear infinite'
    },
    divider: {
        position: 'relative' as 'relative',
        margin: '32px 0',
        textAlign: 'center' as const
    },
    dividerText: {
        display: 'inline-block',
        padding: '0 12px',
        backgroundColor: '#ffffff',
        color: '#718096',
        fontSize: '14px',
        position: 'relative' as 'relative',
        zIndex: '1'
    },
    socialButtons: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '12px'
    },
    socialButton: {
        padding: '12px',
        borderRadius: '8px',
        backgroundColor: 'transparent',
        color: '#4a5568',
        fontSize: '14px',
        fontWeight: '600',
        border: '1px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px'
    },
    socialIcon: {
        width: '20px',
        height: '20px',
        fill: 'currentColor'
    },
    footer: {
        marginTop: '32px',
        textAlign: 'center' as const,
        color: '#718096',
        fontSize: '14px'
    },
    footerLink: {
        color: '#4f46e5',
        fontWeight: '600',
        textDecoration: 'none'
    }
}

export default SignIn