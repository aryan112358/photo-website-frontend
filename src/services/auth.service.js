import axios from '../utils/axios';

export const loginUser = (credentials) => {
    return axios.post('/auth/login', credentials);
};

export const registerUser = (userData) => {
    return axios.post('/auth/register', userData);
};

export const getCurrentUser = () => {
    return axios.get('/auth/me');
}; 