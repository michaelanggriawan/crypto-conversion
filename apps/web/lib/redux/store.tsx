import { configureStore } from "@reduxjs/toolkit";
import api from "../services/api";
import { isDev } from "../../config";
import reducer from "./reducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- unknown type
export const makeStore = (preloadedState: any) => {
  return configureStore({
    reducer,
    devTools: isDev,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- unknown type
    preloadedState,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
