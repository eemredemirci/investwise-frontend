import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import portfolioReducer from './slices/portfolioSlice';
import newsReducer from './slices/newsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,
    news: newsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store; 