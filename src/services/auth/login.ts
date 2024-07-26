import { SignInData, SignUpData, UserCreationResponse } from "../../interfaces/auth/auth";
import { baseApi } from "../baseApi/baseApi";

//inject endponts

const user_auth = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserCreationResponse, SignInData>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation<UserCreationResponse, SignUpData>({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        body,
      }),
    }),
    individualSignup: builder.mutation<UserCreationResponse, SignUpData>({
      query: (body) => ({
        url: "/auth/ind",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation,useIndividualSignupMutation } = user_auth;
