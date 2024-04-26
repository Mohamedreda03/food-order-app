import { apiSlice } from "@/rtk/api/apiSlice";

export const OrdersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `orders`,
      providesTags: ["Order"],
    }),
    getOrdersPagination: builder.query({
      query: (data) => `orders?page=${data.page}&size=${data.size}`,
      providesTags: ["Order"],
    }),
    getOrder: builder.query({
      query: (data) => `orders/${data.id}`,
      providesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `orders/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useDeleteOrderMutation,
  useGetOrdersPaginationQuery,
  useUpdateOrderMutation,
} = OrdersApiSlice;
