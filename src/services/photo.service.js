import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getPhotos = (page = 0, size = 12) => {
    return axiosInstance.get(`/photos?page=${page}&size=${size}`);
};

export const uploadPhoto = (formData) => {
    return axiosInstance.post('/photos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const likePhoto = (photoId) => {
    return axiosInstance.post(`/photos/${photoId}/like`);
};

export const addComment = (photoId, content) => {
    return axiosInstance.post(`/photos/${photoId}/comments`, { content });
};

export const getPhotoDetails = (photoId) => {
    return axiosInstance.get(`/photos/${photoId}`);
}; 