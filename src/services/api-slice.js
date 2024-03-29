import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  tagTypes: ["Reviews", "Documents", "History", "Pets", "PetInfo"],
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
    getUserDetails: builder.query({
      query: () => `user/details`,
    }),
    getUserReview: builder.query({
      query: () => `user/review`,
    }),
    getAllUserPetsIds: builder.query({
      query: () => `user/pets`,
      providesTags: ["Pets"],
    }),
    getPetById: builder.query({
      query: (id) => `pets/id?id=${id}`,
      providesTags: ["PetInfo"],
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
    login: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
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
    forgotPassword: builder.mutation({
      query: (body) => ({
        method: "POST",
        body,
        url: `/forgot`,
      }),
    }),
    getAllProducts: builder.query({
      query: () => `shop/products`,
    }),
    getAllServices: builder.query({
      query: () => `services`,
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
    createNewPet: builder.mutation({
      query: (body) => ({
        method: "POST",
        body: body,
        url: `user/pets`,
      }),
      invalidatesTags: ["Pets"],
    }),
    deletePet: builder.mutation({
      query: (body) => ({
        method: "DELETE",
        body: body,
        url: "user/pets",
      }),
      invalidatesTags: ["Pets"],
    }),
    editPet: builder.mutation({
      query: (body) => ({
        method: "PATCH",
        body: body,
        url: "pets/id",
      }),
      invalidatesTags: ["PetInfo"],
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
  useEditPetMutation,
  // USER
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useGetUserOrdersQuery,
  useCreateNewPetMutation,
  useGetUserDetailsQuery,
  useDeletePetMutation,
  useGetUserReviewQuery,

  useGetAllProductsQuery,
  useGetAllServicesQuery,
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
