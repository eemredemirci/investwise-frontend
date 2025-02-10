/**
 * Haberler (News) Slice
 * 
 * Bu slice, uygulama haberlerini ve bildirimlerini yönetir.
 * Özellikler:
 * - Haber listesi
 * - Okunmamış haber sayısı
 * - Haber kategorileri
 * - Önem seviyeleri
 * 
 * Actions:
 * - setNews: Tüm haber listesini günceller
 * - addNews: Yeni haber ekler
 * - markAsRead: Haberi okundu olarak işaretler
 * - markAllAsRead: Tüm haberleri okundu olarak işaretler
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsState, NewsItem } from '../../types';

/**
 * Başlangıç durumu
 */
const initialState: NewsState = {
  items: [
    {
      id: '1',
      title: 'Piyasalarda Son Durum',
      content: 'Borsa İstanbul güne yükselişle başladı...',
      category: 'market',
      importance: 'high',
      date: new Date().toISOString(),
      isRead: false,
    },
    {
      id: '2',
      title: 'Yeni Fon Lansmanı',
      content: 'ABC Portföy yeni teknoloji fonunu yatırımcılara sundu...',
      category: 'fund',
      importance: 'medium',
      date: new Date().toISOString(),
      isRead: false,
    },
  ],
  unreadCount: 2,
};

/**
 * News slice tanımı
 */
const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    /**
     * Tüm haber listesini günceller ve okunmamış sayısını hesaplar
     * @param state - Mevcut state
     * @param action - Güncellenecek haber listesi
     */
    setNews: (state, action: PayloadAction<NewsItem[]>) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter(item => !item.isRead).length;
    },

    /**
     * Yeni haber ekler ve okunmamış sayısını günceller
     * @param state - Mevcut state
     * @param action - Eklenecek haber
     */
    addNews: (state, action: PayloadAction<NewsItem>) => {
      state.items.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },

    /**
     * Haberi okundu olarak işaretler
     * @param state - Mevcut state
     * @param action - Okundu işaretlenecek haberin ID'si
     */
    markAsRead: (state, action: PayloadAction<string>) => {
      const news = state.items.find(item => item.id === action.payload);
      if (news && !news.isRead) {
        news.isRead = true;
        state.unreadCount -= 1;
      }
    },

    /**
     * Tüm haberleri okundu olarak işaretler
     * @param state - Mevcut state
     */
    markAllAsRead: (state) => {
      state.items.forEach(item => {
        item.isRead = true;
      });
      state.unreadCount = 0;
    },
  },
});

export const { setNews, addNews, markAsRead, markAllAsRead } = newsSlice.actions;
export default newsSlice.reducer; 