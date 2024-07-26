import {
  RelocationData,
  RelocationResponse,
} from "../../interfaces/relocation/relocation";
import { baseApi } from "../baseApi/baseApi";
import Cookies from "js-cookie";

//inject endponts
const relocationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRelocation: builder.query({
      query: () => ({
        url: "/relocation",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
    }),
    postRelocation: builder.mutation<RelocationResponse, RelocationData>({
      query: (body) => ({
        url: "/relocation",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),

      transformResponse: (response: RelocationResponse) => {
        return response;
      },
    }),
    deleteRelocation: builder.mutation({
      query: (body) => ({
        url: "/relocation",
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
  useGetRelocationQuery,
  usePostRelocationMutation,
  useDeleteRelocationMutation,
} = relocationApi;
