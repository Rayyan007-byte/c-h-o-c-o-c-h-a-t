import { configureStore } from "@reduxjs/toolkit";
import useridReduser from "./slice";

export const store = configureStore({
  reducer: {
    userid: useridReduser,
  },
});
