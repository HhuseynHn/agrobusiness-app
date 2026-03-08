import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import favoriteReducer from "./slices/favoriteSlice";
import authReducer from "./slices/authSlice";
import farmerReducer from "./slices/farmerSlice";
import blogReducer from "./slices/blogSlice";
import filterReducer from "./slices/filterSlice";
import uiReducer from "./slices/uiSlice";
import orderReducer from "./slices/orderSlice";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  favorites: favoriteReducer,
  auth: authReducer,
  farmers: farmerReducer,
  blog: blogReducer,
  filter: filterReducer,
  ui: uiReducer,
  orders: orderReducer,
});

const persistConfig = {
  key: "agro-root",
  storage,
  whitelist: ["cart", "favorites", "ui"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"] },
    }),
});

export const persistor = persistStore(store);
