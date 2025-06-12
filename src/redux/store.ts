import {configureStore} from '@reduxjs/toolkit';
import manufacturersReducer from './manufacturersSlice';
import userReducer from './userSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    manufacturers: manufacturersReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
