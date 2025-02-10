/**
 * API Servis Yapılandırması
 * Bu dosya, backend API'si ile iletişimi yönetir.
 * Axios instance'ı ve interceptor'lar burada yapılandırılır.
 */
import axios from 'axios';
import { Fund } from '../types';

// Axios instance'ı oluştur ve temel yapılandırmayı yap
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Her API isteğinden önce çalışır
 * - Authorization header'ına token ekler
 */
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

/**
 * Response Interceptor
 * Her API yanıtından sonra çalışır
 * - 401 hatası durumunda kullanıcıyı login sayfasına yönlendirir
 */
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

/**
 * Kimlik doğrulama ile ilgili API endpoint'leri
 */
export const authAPI = {
  // Kullanıcı girişi
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  // Yeni kullanıcı kaydı
  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
};

/**
 * Fon işlemleri ile ilgili API endpoint'leri
 */
export const fundsAPI = {
  // Tüm fonları getir
  getAllFunds: async () => {
    const response = await api.get<Fund[]>('/funds');
    return response.data;
  },
  // Belirli bir fonu getir
  getFundById: async (id: string) => {
    const response = await api.get<Fund>(`/funds/${id}`);
    return response.data;
  },
  // Kullanıcının portföyünü getir
  getUserPortfolio: async () => {
    const response = await api.get<Fund[]>('/portfolio');
    return response.data;
  },
  // Portföye fon ekle
  addFundToPortfolio: async (fundId: string, amount: number) => {
    const response = await api.post('/portfolio/add', { fundId, amount });
    return response.data;
  },
  // Portföyden fon çıkar
  removeFundFromPortfolio: async (fundId: string) => {
    const response = await api.delete(`/portfolio/${fundId}`);
    return response.data;
  },
};

export default api; 