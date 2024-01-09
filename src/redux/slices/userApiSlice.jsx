import { apiSlice } from "./apiSlice";

const USER_URL = "/api/v1/users";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useRegisterMutation} = userApiSlice;
