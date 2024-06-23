import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = slice.actions;
export default slice.reducer;
