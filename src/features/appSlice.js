import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    selectedImage: null,
    loading: true,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setSelectedImageSrc: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetSelectedImageSrc: (state) => {
      state.selectedImage = null;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});
export const {
  login,
  logout,
  setSelectedImageSrc,
  resetSelectedImageSrc,
  startLoading,
  stopLoading,
} = appSlice.actions;

export const selectApp = (state) => state.app.value;
export const selectedImages = (state) => state.app.selectedImage;
export const selectUser = (state) => state.app.user;
export const Aloader = (state) => state.app.loading;
export default appSlice.reducer;
