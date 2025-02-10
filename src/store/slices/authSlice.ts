/**
 * Kimlik Doğrulama (Auth) Slice
 * 
 * Bu slice, kullanıcı kimlik doğrulama durumunu yönetir.
 * Özellikler:
 * - Kullanıcı oturum durumu
 * - Kullanıcı bilgileri
 * - JWT token yönetimi
 * 
 * Actions:
 * - setCredentials: Kullanıcı bilgilerini ve token'ı ayarlar
 * - logout: Kullanıcı oturumunu sonlandırır
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';

/**
 * Başlangıç durumu
 */
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

/**
 * Auth slice tanımı
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Kullanıcı bilgilerini ve token'ı ayarlar
     * @param state - Mevcut state
     * @param action - Kullanıcı bilgileri ve token
     */
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthState['user']; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    /**
     * Kullanıcı oturumunu sonlandırır
     * @param state - Mevcut state
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer; 