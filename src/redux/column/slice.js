import { createSlice } from '@reduxjs/toolkit';
import {
  addColumn,
  deleteColumn,
  editColumn,
  fetchColumns,
  getColumnById,
} from './operations';

const slice = createSlice({
  name: 'columns',
  initialState: {
    items: [],
    currentColumn: null,
    loading: false,
    error: false,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchColumns.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchColumns.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addColumn.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addColumn.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getColumnById.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getColumnById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentColumn = action.payload;
        console.log(action.payload);
      })
      .addCase(getColumnById.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteColumn.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.items = state.items.filter(
          item => item._id !== action.payload._id,
        );
        state.loading = false;
        state.currentColumn = null;
      })
      .addCase(deleteColumn.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editColumn.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map(item =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(editColumn.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export default slice.reducer;
