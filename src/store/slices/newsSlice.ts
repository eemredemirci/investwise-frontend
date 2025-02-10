import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  category: 'market' | 'fund' | 'economy' | 'company';
  importance: 'high' | 'medium' | 'low';
}

interface NewsState {
  items: News[];
  unreadCount: number;
}

const initialState: NewsState = {
  items: [
    {
      id: '1',
      title: 'Merkez Bankası Faiz Kararı Açıklandı',
      content: 'Merkez Bankası politika faizini %45 seviyesinde sabit tuttu.',
      date: new Date().toISOString(),
      isRead: false,
      category: 'economy',
      importance: 'high',
    },
    {
      id: '2',
      title: 'Yeni Teknoloji Fonu Piyasaya Sunuldu',
      content: 'ABC Portföy, yeni teknoloji odaklı yatırım fonunu yatırımcılara sundu.',
      date: new Date().toISOString(),
      isRead: false,
      category: 'fund',
      importance: 'medium',
    },
    // Daha fazla örnek haber eklenebilir
  ],
  unreadCount: 2,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<Omit<News, 'isRead'>>) => {
      state.items.unshift({
        ...action.payload,
        isRead: false,
      });
      state.unreadCount += 1;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const news = state.items.find(item => item.id === action.payload);
      if (news && !news.isRead) {
        news.isRead = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(news => {
        news.isRead = true;
      });
      state.unreadCount = 0;
    },
  },
});

export const { addNews, markAsRead, markAllAsRead } = newsSlice.actions;
export default newsSlice.reducer; 