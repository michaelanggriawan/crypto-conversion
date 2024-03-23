import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // eslint-disable-next-line turbo/no-undeclared-env-vars -- this is fine
    baseUrl: process.env.API_URL,
  }),
  tagTypes: ["GetSelectedBreeds", "GetRandomImages"],
  endpoints: () => ({}),
});

export default api;
