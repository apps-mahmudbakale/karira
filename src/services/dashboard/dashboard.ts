import { baseApi } from "../baseApi/baseApi";
import { DeliveriesResponse, DeliveryPayload } from "../../interfaces/dashboard/dashboard";
import { SingleDeliveryApiResponse } from "../../interfaces/deliveries/interface";

import Cookies from "js-cookie";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveries: builder.query<DeliveriesResponse, void>({
      query: () => ({
        url: "/delivery/initial",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      providesTags: ["SingleDelivery"],
    }),
    getSingleDelivery: builder.query<SingleDeliveryApiResponse, string>({
      query: (id) => ({
        url: `/delivery/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
    }),

    editDelivery: builder.mutation<void, { payload:DeliveryPayload, id:string }>({
      query: (
        { payload, id }
      ) => ({
        url: `/delivery/update/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      invalidatesTags: ["SingleDelivery"],
    }),

    getPastDeliveries: builder.query<DeliveriesResponse, void>({
      query: () => ({
        url: "/delivery/completed",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      providesTags: ["PastDeliveries"],
    }),
    postDelivery: builder.mutation<void, DeliveryPayload>({
      query: (body) => ({
        url: "/delivery/create",
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      invalidatesTags: ["SingleDelivery"],
    }),

    updateDelivery: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delivery/initiate/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),

      invalidatesTags: ["SingleDelivery", "PastDeliveries"],
    }),

    deleteDelivery: builder.mutation({
      query: (body) => ({
        url: "/deliveries",
        method: "DELETE",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDeliveriesQuery,
  usePostDeliveryMutation,
  useDeleteDeliveryMutation,
  useGetPastDeliveriesQuery,
  useUpdateDeliveryMutation,
  useGetSingleDeliveryQuery,
  useEditDeliveryMutation,
} = dashboardApi;
