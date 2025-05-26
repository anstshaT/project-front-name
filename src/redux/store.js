import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import loaderReducer from "./loaderSlice";
import categoriesReducer from "./categories/categoriesSlice";
import userReducer from "./user/userSlice";
import transactionsReducer from "./transactions/transactionsSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    loader: loaderReducer,
    categories: categoriesReducer,
    user: userReducer,
    transactions: transactionsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
