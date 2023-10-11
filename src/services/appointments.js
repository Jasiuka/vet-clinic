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
  }),
});

export const {
  useGetAppointmentsByDateRangeQuery,
  useGetAppointmentByIdQuery,
} = appointmentsApi;
