export const toastOptions = {
    style: {
        background: 'var(--background-primary)',
        color: 'var(--foreground-primary)',
        border: '1.5px solid var(--action-primary)',
        boxShadow: '0 4px 32px 0 rgba(60, 60, 90, 0.07)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.1rem', // Larger font size
        fontWeight: 600, // Bolder text
        padding: '1.1rem 1.5rem', // More padding
        borderRadius: '0.75rem', // Rounded corners
        minWidth: '320px', // Wider toast
        letterSpacing: '0.01em',
        textAlign: 'left', // Left-align text
    },
    success: {
        iconTheme: {
            primary: 'var(--accent)',
            secondary: 'var(--background-primary)',
        },
    },
    error: {
        iconTheme: {
            primary: '#e74c3c',
            secondary: 'var(--background-primary)',
        },
    },
}
