import axios from 'axios';
import { API_URL, STORAGE_KEYS } from '@/utils/constant';
import { storage } from '@/utils/storage'; 

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach the auth token
api.interceptors.request.use(
    async (config) => {
        const token = await storage.load(STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Clear the token and redirect to login
            // This should be handled by the auth store in a real app
            await storage.remove(STORAGE_KEYS.AUTH_TOKEN);

            // You would typically navigate to login here or refresh the token
            // Navigation will be handled by the auth store
        }

        return Promise.reject(error);
    }
);

export default api;