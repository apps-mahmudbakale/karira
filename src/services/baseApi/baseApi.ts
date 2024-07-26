import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["SingleDelivery","PastDeliveries"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://goldfish-app-36bkj.ondigitalocean.app/api/v1",
  }),
  endpoints: () => ({}),
});
