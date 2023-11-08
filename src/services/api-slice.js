import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  endpoints: (builder) => ({
    getAppointmentsByDateRange: builder.query({
      query: (dateRange) =>
        `appointments?startDate=${dateRange.start}&endDate=${dateRange.end}`,
    }),
    getAppointmentById: builder.query({
      query: (id) => `appointments/id?id=${id}`,
    }),
    getAllUserPetsIds: builder.query({
      query: () => `user/pets`,
    }),
    getPetById: builder.query({
      query: (id) => `pets/id?id=${id}`,
    }),
    getPetDocumentsById: builder.query({
      query: (id) => `pets/documents/id?id=${id}`,
    }),
    getPetHistoryById: builder.query({
      query: (id) => `pets/history/id?id=${id}`,
    }),
    getAllPetAppointments: builder.query({
      query: (id) => `pets/appointments/id?id=${id}`,
    }),
    login: builder.query({
      query: (body) => ({
        url: `/login`,
        method: "Post",
        body,
      }),
    }),
    signup: builder.mutation({
      query: (userObject) => ({
        url: "/signup",
        method: "POST",
        body: userObject,
      }),
    }),
    getAllEmployees: builder.query({
      query: () => `admin/employees`,
    }),
    getAllAppointments: builder.query({
      query: () => `admin/appointments`,
    }),
    getAllProducts: builder.query({
      query: () => `shop/products`,
    }),
    getAllProductsAdmin: builder.query({
      query: () => `admin/products`,
    }),
    getAllServices: builder.query({
      query: () => `services`,
    }),
    getColumnNamesByTable: builder.query({
      query: (tableName) => `admin/columns/tableName?tableName=${tableName}`,
    }),
    getVetAppointments: builder.query({
      query: () => `vet/appointments/`,
    }),
    getOrders: builder.query({
      query: (id) => `/orders/id?id=${id}`,
    }),
  }),
});

export const {
  useGetAppointmentsByDateRangeQuery,
  useGetAppointmentByIdQuery,
  useGetPetByIdQuery,
  useGetPetDocumentsByIdQuery,
  useGetPetHistoryByIdQuery,
  useGetAllUserPetsIdsQuery,
  useLoginQuery,
  useSignupMutation,
  useGetAllEmployeesQuery,
  useGetAllAppointmentsQuery,
  useGetAllProductsQuery,
  useGetAllProductsAdminQuery,
  useGetAllServicesQuery,
  useGetColumnNamesByTableQuery,
  useGetVetAppointmentsQuery,
  useGetAllPetAppointmentsQuery,
  useGetOrdersQuery,
} = apiSlice;
