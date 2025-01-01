export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    return {
        isValid: password.length >= 8,
        message: password.length < 8 ? 'Password must be at least 8 characters' : ''
    };
};

export const validatePhotoUpload = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
        return {
            isValid: false,
            message: 'Invalid file type. Please upload JPEG, PNG, or GIF'
        };
    }

    if (file.size > maxSize) {
        return {
            isValid: false,
            message: 'File size too large. Maximum size is 5MB'
        };
    }

    return { isValid: true, message: '' };
};

export const validateForm = (values, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
        const value = values[field];
        const fieldRules = rules[field];

        if (fieldRules.required && !value) {
            errors[field] = 'This field is required';
        } else if (fieldRules.minLength && value.length < fieldRules.minLength) {
            errors[field] = `Minimum length is ${fieldRules.minLength} characters`;
        } else if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
            errors[field] = `Maximum length is ${fieldRules.maxLength} characters`;
        } else if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
            errors[field] = fieldRules.message || 'Invalid format';
        }
    });

    return errors;
}; 