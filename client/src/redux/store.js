import { configureStore } from "@reduxjs/toolkit";
import useridReducer from "./slice";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: "root",
  storage
}
const persistedReducer = persistReducer(persistConfig, useridReducer)
 export const store = configureStore({
  reducer: {
    userid: persistedReducer,
  },
});
export const persistor = persistStore(store)
