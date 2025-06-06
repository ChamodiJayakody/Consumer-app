import { configureStore } from '@reduxjs/toolkit';
import manufacturersReducer from './manufacturersSlice';
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    manufacturers: manufacturersReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;