import { createSlice } from '@reduxjs/toolkit';
import {
  addBoard,
  deleteBoard,
  editBoard,
  fetchBoards,
  getBoardById,
} from './operations';
import { logOut } from '../auth/operations';

const initialState = {
  items: [],
  currentBoard: '',
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    resetCurrentBoard(state) {
      state.currentBoard = '';
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBoards.pending, state => {
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBoard.pending, state => {
        state.loading = true;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBoardById.pending, state => {
        state.loading = true;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(getBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBoard.pending, state => {
        state.loading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.items = state.items.filter(
          item => item._id !== action.payload._id,
        );
        state.loading = false;
        state.currentBoard = null;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editBoard.pending, state => {
        state.loading = true;
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map(item =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(editBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.loading = false;
        state.currentBoard = null;
      }),
});

export default slice.reducer;

export const { resetCurrentBoard } = slice.actions;
