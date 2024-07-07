import { createSlice } from '@reduxjs/toolkit';
import {
  addCard,
  deleteCard,
  editCard,
  fetchAllCards,
  getCardById,
} from './operations';

const slice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    selectedCard: null,
    loading: false,
    error: false,
    filterBy: 'all_priority',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filterBy = action.payload;
    },
    resetCards: state => {
      state.items = [];
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAllCards.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.map(newCard => {
          state.items.push(newCard);
        });
      })
      .addCase(fetchAllCards.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addCard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteCard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          item => item._id !== action.payload._id,
        );
      })
      .addCase(deleteCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editCard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editCard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          item => item._id !== action.payload._id,
        );
        state.items.push(action.payload);
      })
      .addCase(editCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getCardById.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCard = action.payload;
      })
      .addCase(getCardById.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export default slice.reducer;
export const { setFilter, resetCards } = slice.actions;
