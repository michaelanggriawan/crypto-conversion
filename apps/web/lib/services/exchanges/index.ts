import api from "../api";

export const exchangesCryptoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTokens: builder.query<
      ApiResponse<
        {
          id: string;
          symbol: string;
          name: string;
        }[]
      >,
      unknown
    >({
      query: () => ({
        url: "tokens",
        method: "GET",
      }),
    }),
    getPrices: builder.mutation<
      ApiResponse<Record<string, Record<string, string>>>,
      { ids: string; currency: string }
    >({
      query: ({ ids, currency }) => ({
        url: `tokens/prices?ids=${ids}&currency=${currency}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTokensQuery, useGetPricesMutation } = exchangesCryptoApi;
