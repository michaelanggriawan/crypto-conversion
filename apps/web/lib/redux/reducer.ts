import { combineReducers } from "@reduxjs/toolkit";
import api from "../services/api";
import { cryptoExchangesReducer } from "./crypto-exchange/store";

export type RootState = ReturnType<typeof reducer>;

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  ...cryptoExchangesReducer,
});

export default reducer;
