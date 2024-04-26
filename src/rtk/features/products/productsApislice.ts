import { apiSlice } from "@/rtk/api/apiSlice";

const productsApislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `products`,
      providesTags: ["Product"],
    }),
    getLastProducts: builder.query({
      query: () => `products/new-items`,
      providesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    getProductsFilter: builder.query({
      query: () => `products/filter/best-seller`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product", "Category"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product", "Category"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `products/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Product", "Category"],
    }),
    productsPagination: builder.query({
      query: (arg: { page: number; size: number }) =>
        `products/pagination?page=${arg.page}&size=${arg.size}`,
      providesTags: ["Product"],
    }),
    createSize: builder.mutation({
      query: (data) => ({
        url: `products/${data.id}/sizes`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["Size", "Category"],
    }),
    getSizes: builder.query({
      query: (data) => `products/${data.id}/sizes`,
      providesTags: ["Size"],
    }),
    deleteSize: builder.mutation({
      query: (data) => ({
        url: `products/${data.id}/sizes/${data.sizeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Size", "Category"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useProductsPaginationQuery,
  useCreateSizeMutation,
  useGetSizesQuery,
  useDeleteSizeMutation,
  useGetProductsFilterQuery,
  useGetLastProductsQuery,
} = productsApislice;
