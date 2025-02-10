export interface Fund {
  id: string;
  name: string;
  type: string;
  value: number;
  performance: number;
  risk: 'low' | 'medium' | 'high';
}

export interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  category: 'market' | 'fund' | 'economy' | 'company';
  importance: 'high' | 'medium' | 'low';
}

export interface NewsState {
  items: News[];
  unreadCount: number;
}

export interface PortfolioState {
  funds: Fund[];
  totalValue: number;
  loading: boolean;
  error: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id?: string;
    email?: string;
    name?: string;
  } | null;
  token: string | null;
}

export interface RootState {
  auth: AuthState;
  portfolio: PortfolioState;
  news: NewsState;
} 