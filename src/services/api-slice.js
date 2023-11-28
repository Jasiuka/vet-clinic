import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  tagTypes: ["Reviews", "Documents", "History"],
  endpoints: (builder) => ({
    getAppointmentsByDateRange: builder.query({
      query: (dateRange) =>
        `appointments?startDate=${dateRange.start}&endDate=${dateRange.end}`,
    }),
    getAppointmentById: builder.query({
      query: (id) => `appointments/id?id=${id}`,
    }),
    bookAppointment: builder.mutation({
      query: (body) => ({
        url: "/appointments",
        method: "POST",
        body: body,
      }),
    }),
    getAllUserPetsIds: builder.query({
      query: () => `user/pets`,
    }),
    getPetById: builder.query({
      query: (id) => `pets/id?id=${id}`,
    }),
    getPetDocumentsById: builder.query({
      query: (id) => `pets/documents/id?id=${id}`,
      providesTags: ["Documents"],
    }),
    getPetHistoryById: builder.query({
      query: (id) => `pets/history/id?id=${id}`,
      providesTags: ["History"],
    }),
    getAllPetAppointments: builder.query({
      query: (id) => `pets/appointments/id?id=${id}`,
    }),
    uploadPetDocument: builder.mutation({
      query: (body) => ({
        body: body,
        url: `files/upload`,
        method: "POST",
      }),
      invalidatesTags: ["Documents"],
    }),
    addPetDiagnosis: builder.mutation({
      query: (body) => ({
        url: `pets/history`,
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["History"],
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
    postOrder: builder.mutation({
      query: (data) => ({
        url: "/shop/order",
        method: "POST",
        body: data,
      }),
    }),
    getReviews: builder.query({
      query: () => `/reviews`,
      providesTags: ["Reviews"],
    }),
    postReview: builder.mutation({
      query: (review) => ({
        url: "/reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Reviews"],
    }),
    getUserOrders: builder.query({
      query: () => `/orders`,
    }),
  }),
});

export const {
  // APPOINTMENTS
  useGetAppointmentsByDateRangeQuery,
  useGetAppointmentByIdQuery,
  useBookAppointmentMutation,
  // PETS
  useGetPetByIdQuery,
  useGetPetDocumentsByIdQuery,
  useGetPetHistoryByIdQuery,
  useGetAllPetAppointmentsQuery,
  useGetAllUserPetsIdsQuery,
  useAddPetDiagnosisMutation,
  // USER
  useLoginQuery,
  useSignupMutation,
  useGetUserOrdersQuery,
  // ADMIN
  useGetAllEmployeesQuery,
  useGetAllAppointmentsQuery,
  useGetAllProductsQuery,
  useGetAllProductsAdminQuery,
  useGetAllServicesQuery,
  useGetColumnNamesByTableQuery,
  useGetVetAppointmentsQuery,
  // ORDERS
  useGetOrdersQuery,
  usePostOrderMutation,

  // REVIEWS
  useGetReviewsQuery,
  usePostReviewMutation,
  // DOCUMENTS
  useUploadPetDocumentMutation,
} = apiSlice;
