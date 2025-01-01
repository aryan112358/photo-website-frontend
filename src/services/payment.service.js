import axios from '../utils/axios';

export const processPayment = (paymentData) => {
    return axios.post('/payments/create-payment-intent', paymentData);
};

export const getPurchaseHistory = () => {
    return axios.get('/payments/history');
}; 