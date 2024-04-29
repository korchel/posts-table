import { createSlice } from '@reduxjs/toolkit';

import type { RootStateType } from './index';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { shown: true },
  reducers: {
    openModal: (state) => {
      state.shown = true;
    },
    closeModal: (state) => {
      state.shown = false;
    },
  },
});

export const getShown = (state: RootStateType): boolean => state.modalSlice.shown;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
