import { configureStore } from '@reduxjs/toolkit';
import manufacturersReducer from './manufacturersSlice';

export const store = configureStore({
  reducer: {
    manufacturers: manufacturersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;