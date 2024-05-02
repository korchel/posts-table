import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootStateType } from './index';
import type { SortDirection, SortKey, IPost } from '../types';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  }
);

interface IState {
  loadingState: 'idle' | 'loading' | 'failed',
  loadingError: string | null,
  data: IPost[],
  dataWasFetched: boolean,
  sortKey: SortKey,
  sortDirection: SortDirection,
  filter: string,
}

const initialState: IState = {
  loadingState: 'idle',
  loadingError: null,
  data: [],
  dataWasFetched: false,
  sortKey: 'id',
  sortDirection: 'up',
  filter: '',
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
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
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

export const { setSortKey, setSortDirection, setFilter } = dataSlice.actions;

export const getloadingState = (state: RootStateType): string => state.dataSlice.loadingState;
export const getLoadingError = (state: RootStateType): string | null => state.dataSlice.loadingError;
export const getData = (state: RootStateType): IPost[] => state.dataSlice.data;
export const getDataWasFetched = (state: RootStateType): boolean => state.dataSlice.dataWasFetched;
export const getSortKey = (state: RootStateType): SortKey => state.dataSlice.sortKey;
export const getSortDierction = (state: RootStateType): SortDirection => state.dataSlice.sortDirection;
export const getFilter = (state: RootStateType): string => state.dataSlice.filter;

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

export const getFilteredData = createSelector(
  getSortedData,
  getFilter,
  (data, filter) => data.filter((item: IPost) => item.body.includes(filter) || item.title.includes(filter))
);

export default dataSlice.reducer;
