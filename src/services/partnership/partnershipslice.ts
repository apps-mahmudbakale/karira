import { baseApi } from "../baseApi/baseApi";
import {
  PartnerPayload,
  VehiclePayload,
} from "../../interfaces/partnership/interface";

// inject the baseApi
const partnersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPartner: build.mutation<void, PartnerPayload>({
      query: (body) => ({
        url: `/auth/partner`,
        method: "POST",
        body,
      }),
    }),
    registerVehicle: build.mutation<
      void,
      { payload: VehiclePayload; id: string }
    >({
      query: ({ payload, id }) => ({
        url: `/partner/${id}`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreatePartnerMutation, useRegisterVehicleMutation } =
  partnersApi;
