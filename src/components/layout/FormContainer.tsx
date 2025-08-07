import React from 'react'

interface FormContainerProps {
    title: string
    children: React.ReactNode
}

const FormContainer: React.FC<FormContainerProps> = ({ title, children }) => {
    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#f9fafb',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: '3rem',
                paddingBottom: '3rem',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
            }}
        >
            <div style={{ margin: '0 auto', width: '100%', maxWidth: '28rem' }}>
                <h2
                    style={{
                        marginTop: '1.5rem',
                        textAlign: 'center',
                        fontSize: '1.875rem',
                        fontWeight: 800,
                        color: '#1f2937',
                    }}
                >
                    {title}
                </h2>
            </div>

            <div style={{ marginTop: '2rem', margin: '0 auto', width: '100%', maxWidth: '28rem' }}>
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        padding: '2rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        borderRadius: '0.5rem',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FormContainer
