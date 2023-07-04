import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./src/reducers/authReducer";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
