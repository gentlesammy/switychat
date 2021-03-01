import { configureStore } from "@reduxjs/toolkit";
import cameraSlice from "./../features/cameraSlice";
import appSlice from "./../features/appSlice";

export default configureStore({
  reducer: {
    camera: cameraSlice,
    app: appSlice,
  },
});
