import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentsApi = createApi({
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
    getPetById: builder.query({
      query: (id) => `pets/id?id=${id}`,
    }),
    getPetDocumentsById: builder.query({
      query: (id) => `pets/documents/id?id=${id}`,
    }),
    getPetHistoryById: builder.query({
      query: (id) => `pets/history/id?id=${id}`,
    }),
    login: builder.query({
      query: (credentials) =>
        `user/login?email=${credentials.email}&password=${credentials.password}`,
    }),
    getAllEmployees: builder.query({
      query: () => `admin/employees`,
    }),
    getAllAppointments: builder.query({
      query: () => `admin/appointments`,
    }),
  }),
});

export const {
  useGetAppointmentsByDateRangeQuery,
  useGetAppointmentByIdQuery,
  useGetPetByIdQuery,
  useGetPetDocumentsByIdQuery,
  useGetPetHistoryByIdQuery,
  useLoginQuery,
  useGetAllEmployeesQuery,
  useGetAllAppointmentsQuery,
} = appointmentsApi;
