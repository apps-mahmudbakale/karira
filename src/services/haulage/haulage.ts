import { baseApi } from "../baseApi/baseApi";
import { TripData, ResponseData } from "../../interfaces/haulage/haulage";
import Cookies from "js-cookie";

//inject endponts

const haulageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHaulage: builder.query({
      query: () => ({
        url: "/haulage",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
    }),
    postHaulage: builder.mutation<ResponseData, TripData>({
      query: (body) => ({
        url: "/haulage",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      transformResponse: (response: ResponseData) => response,
    }),
    deleteHaulage: builder.mutation({
      query: (body) => ({
        url: "/haulage",
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
  useGetHaulageQuery,
  usePostHaulageMutation,
  useDeleteHaulageMutation,
} = haulageApi;