import { apiSlice } from "@/rtk/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthUser: builder.query({
      query: () => `profile`,
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (data) => `users/${data.id}`,
      providesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => "users",
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `users/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["User"],
    }),
    updateAuthUser: builder.mutation({
      query: (data) => ({
        url: `profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    userPagination: builder.query({
      query: (arg: { page: number; size: number }) =>
        `users/pagination?page=${arg.page}&size=${arg.size}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAuthUserQuery,
  useUpdateAuthUserMutation,
  useUserPaginationQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = usersApiSlice;
