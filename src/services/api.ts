import axios from 'axios';
import { Fund } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
};

export const fundsAPI = {
  getAllFunds: async () => {
    const response = await api.get<Fund[]>('/funds');
    return response.data;
  },
  getFundById: async (id: string) => {
    const response = await api.get<Fund>(`/funds/${id}`);
    return response.data;
  },
  getUserPortfolio: async () => {
    const response = await api.get<Fund[]>('/portfolio');
    return response.data;
  },
  addFundToPortfolio: async (fundId: string, amount: number) => {
    const response = await api.post('/portfolio/add', { fundId, amount });
    return response.data;
  },
  removeFundFromPortfolio: async (fundId: string) => {
    const response = await api.delete(`/portfolio/${fundId}`);
    return response.data;
  },
};

export default api; 