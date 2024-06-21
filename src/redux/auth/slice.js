import { createSlice } from "@reduxjs/toolkit";
import { registerUser, logIn, logOut, refreshToken } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.status = "failed";
      })

      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(refreshToken.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isRefreshing = false;
      }),
});

export default authSlice.reducer;
