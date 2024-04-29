import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import modalSlice from './modalSlice';

const store = configureStore({
  reducer: {
    dataSlice,
    modalSlice,
  },
});

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch;

export default store;
