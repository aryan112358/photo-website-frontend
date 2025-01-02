import axios from '../utils/axios';

export const getPhotos = (page = 0, size = 12) => {
    return axios.get(`/photos?page=${page}&size=${size}`);
};

export const uploadPhoto = (formData) => {
    return axios.post('/photos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const likePhoto = (photoId) => {
    return axios.post(`/photos/${photoId}/like`);
};

export const getPhotoDetails = (photoId) => {
    return axios.get(`/photos/${photoId}`);
}; 