import {
  ProfileApiResponse,
  ProfileUpdateData,
} from "../../interfaces/auth/auth";
import { baseApi } from "../baseApi/baseApi";
import Cookies from "js-cookie";


//inject endponts

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<ProfileApiResponse, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
    }),

    updateProfile: build.mutation<void, ProfileUpdateData>({
      query: (payload) => ({
        url: "/auth/update",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
} = profileApi;
