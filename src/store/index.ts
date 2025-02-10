/**
 * Redux store yapılandırması
 * Bu dosya, uygulamanın merkezi state yönetimini yapılandırır.
 * Tüm reducer'lar burada birleştirilir ve tek bir store oluşturulur.
 */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import portfolioReducer from './slices/portfolioSlice';
import newsReducer from './slices/newsSlice';

// Ana store yapılandırması
const store = configureStore({
  reducer: {
    // Kullanıcı kimlik doğrulama state'i
    auth: authReducer,
    // Portföy yönetimi state'i
    portfolio: portfolioReducer,
    // Haberler ve duyurular state'i
    news: newsReducer,
  },
});

// TypeScript için dispatch tipini dışa aktar
export type AppDispatch = typeof store.dispatch;
export default store; 