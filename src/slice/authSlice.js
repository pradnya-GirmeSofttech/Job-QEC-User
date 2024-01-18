import { createSlice } from "@reduxjs/toolkit";
import { loginUser, changePassword, userProfile } from "../actions/auth";

const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  isAuthenticated: false,
  passwordChangeStatus: {
    success: false,
    error: null,
  },
};

//  Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.payload); // Log the payload for debugging
        state.loading = false;
        state.user = null;
        state.error = action.payload.error;
        state.isAuthenticated = false;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.passwordChangeStatus = {
          success: false,
          error: null,
        };
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.passwordChangeStatus = {
          success: true,
          error: null,
        };
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordChangeStatus = {
          success: false,
          error: action.payload,
        };
      })
      .addCase(userProfile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
