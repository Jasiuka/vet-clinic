import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const appointmentsApi = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  endpoints: (builder) => ({
    getAppointmentsByDateRange: builder.query({
      query: (startDate, endDate) =>
        `appointments?startDate=${startDate}&endDate=${endDate}`,
    }),
  }),
});

export const { useGetAppointmentsByDateRange } = appointmentsApi;
