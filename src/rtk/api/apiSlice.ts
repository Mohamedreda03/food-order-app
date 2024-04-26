import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["User", "Category", "Product", "Size", "Order"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: () => ({}),
});
