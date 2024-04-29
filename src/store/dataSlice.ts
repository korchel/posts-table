import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootStateType } from './index';
import type { SortDirection, SortKey } from '../types';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  }
);

interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string,
}

interface IState {
  loadingState: 'idle' | 'loading' | 'failed',
  loadingError: string | null,
  data: IPost[],
  dataWasFetched: boolean,
  sortKey: SortKey,
  sortDirection: SortDirection,
}

const initialState: IState = {
  loadingState: 'idle',
  loadingError: null,
  data: [],
  dataWasFetched: false,
  sortKey: 'id',
  sortDirection: 'up',
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSortKey: (state, { payload }) => {
      state.sortKey = payload;
    },
    setSortDirection: (state, { payload }) => {
      state.sortDirection = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingState = 'loading';
        state.loadingError = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loadingState = 'idle';
        state.loadingError = null;
        state.data = action.payload;
        state.dataWasFetched = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingState = 'failed';
        state.loadingError = action.error.message ?? 'Error';
      });
  },
});

export const { setSortKey, setSortDirection } = dataSlice.actions;

export const getloadingState = (state: RootStateType): string => state.dataSlice.loadingState;
export const getLoadingError = (state: RootStateType): string | null => state.dataSlice.loadingError;
export const getData = (state: RootStateType): IPost[] => state.dataSlice.data;
export const getDataWasFetched = (state: RootStateType): boolean => state.dataSlice.dataWasFetched;
export const getSortKey = (state: RootStateType): SortKey => state.dataSlice.sortKey;
export const getSortDierction = (state: RootStateType): SortDirection => state.dataSlice.sortDirection;

export const getSortedData = createSelector(
  getData,
  getSortKey,
  getSortDierction,
  (data, sortKey, sortDirection) => {
    return data.slice().sort((a, b) => {
      if (a[sortKey] > b[sortKey]) {
        return sortDirection === 'up' ? 1 : -1;
      }
      if (a[sortKey] < b[sortKey]) {
        return sortDirection === 'up' ? -1 : 1;
      }
      return 0;
    });
  }
);

export default dataSlice.reducer;
