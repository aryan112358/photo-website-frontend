const config = {
    api: {
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
        timeout: 5000,
    },
    stripe: {
        publicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
    },
    upload: {
        maxSize: 5 * 1024 * 1024, // 5MB
        acceptedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    },
    pagination: {
        defaultPageSize: 12,
    },
};

export default config; 