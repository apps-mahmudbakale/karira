import { baseApi } from "../baseApi/baseApi";
import { TowingPayload,TowingApiResponse } from "../../interfaces/towing/towing";
import Cookies from "js-cookie";
//inject endponts
const towingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTowing: builder.query({
      query: () => ({
        url: "/towing",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
    }),
    postTowing: builder.mutation<TowingApiResponse, TowingPayload>({
      query: (body) => ({
        url: "/towing",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
    }),
    deleteTowing: builder.mutation({
      query: (body) => ({
        url: "/towing",
        method: "DELETE",
        body,
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTowingQuery,
  usePostTowingMutation,
  useDeleteTowingMutation,
} = towingApi;