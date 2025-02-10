import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Fund, PortfolioState } from '../../types';

const initialState: PortfolioState = {
  funds: [],
  totalValue: 0,
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setFunds: (state, action: PayloadAction<Fund[]>) => {
      state.funds = action.payload;
      state.totalValue = action.payload.reduce((sum, fund) => sum + fund.value, 0);
    },
    addFund: (state, action: PayloadAction<Fund>) => {
      state.funds.push(action.payload);
      state.totalValue += action.payload.value;
    },
    removeFund: (state, action: PayloadAction<string>) => {
      const fundToRemove = state.funds.find(fund => fund.id === action.payload);
      if (fundToRemove) {
        state.totalValue -= fundToRemove.value;
        state.funds = state.funds.filter(fund => fund.id !== action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setFunds, addFund, removeFund, setLoading, setError } = portfolioSlice.actions;
export default portfolioSlice.reducer; 