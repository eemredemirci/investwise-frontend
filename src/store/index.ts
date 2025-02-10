/**
 * Redux Store Konfigürasyonu
 * 
 * Bu dosya, uygulamanın merkezi state yönetimini yapılandırır.
 * Özellikler:
 * - Redux Toolkit kullanımı
 * - Slice'ların birleştirilmesi
 * - Middleware yapılandırması
 * - DevTools entegrasyonu
 * 
 * Slice'lar:
 * - auth: Kullanıcı kimlik doğrulama
 * - portfolio: Yatırım portföyü yönetimi
 * - news: Haber ve bildirimler
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import portfolioReducer from './slices/portfolioSlice';
import newsReducer from './slices/newsSlice';

/**
 * Redux store yapılandırması
 */
const store = configureStore({
  reducer: {
    auth: authReducer,         // Kimlik doğrulama state'i
    portfolio: portfolioReducer, // Portföy state'i
    news: newsReducer,         // Haberler state'i
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Date nesneleri için serialization kontrolünü devre dışı bırak
    }),
  devTools: process.env.NODE_ENV !== 'production', // Geliştirme ortamında DevTools'u etkinleştir
});

// TypeScript için dispatch tipini dışa aktar
export type AppDispatch = typeof store.dispatch;
export default store; 