import axios from '../utils/axios';

export const getAlbums = (page = 0, size = 12) => {
    return axios.get(`/albums?page=${page}&size=${size}`);
};

export const createAlbum = (albumData) => {
    return axios.post('/albums', albumData);
};

export const updateAlbum = (albumId, albumData) => {
    return axios.put(`/albums/${albumId}`, albumData);
};

export const deleteAlbum = (albumId) => {
    return axios.delete(`/albums/${albumId}`);
};

export const addPhotoToAlbum = (albumId, photoId) => {
    return axios.post(`/albums/${albumId}/photos/${photoId}`);
};

export const removePhotoFromAlbum = (albumId, photoId) => {
    return axios.delete(`/albums/${albumId}/photos/${photoId}`);
}; 