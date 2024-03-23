import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const reducerName = "crypto-exchanges";

const slice = createSlice({
  name: reducerName,
  initialState,
  reducers: {},
});

export const cryptoExchangesReducer = { [reducerName]: slice.reducer };
