import {configureStore} from '@reduxjs/toolkit';
import manufacturersReducer from './manufacturersSlice';
import userReducer from './userSlice';
import productReducer from './productSlice';
import {RootState as UserRootState} from './userSlice';
import {ManufacturersState} from './manufacturersSlice';

export const store = configureStore({
  reducer: {
    manufacturers: manufacturersReducer,
    user: userReducer,
  },
});

export interface RootState {
  manufacturers: ManufacturersState;
  user: UserRootState;
}
export type AppDispatch = typeof store.dispatch;
