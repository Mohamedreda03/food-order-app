import { apiSlice } from "@/rtk/api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `categories`,
      providesTags: ["Category", "Product"],
    }),

    getCategory: builder.query({
      query: (id) => `categories/${id}`,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `categories/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Category"],
    }),
    categoriesPagination: builder.query({
      query: (arg: { page: number; size: number }) =>
        `categories/pagination?page=${arg.page}&size=${arg.size}`,
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useCategoriesPaginationQuery,
} = categoriesApiSlice;
