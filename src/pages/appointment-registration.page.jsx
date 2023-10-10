import { useGetAppointmentsByDateRangeQuery } from "../services/appointments";
import { appointmentsApi } from "../services/appointments";
export const AppointmentRegistration = () => {
  const result = appointmentsApi.endpoints.getAppointmentsByDateRange;
  console.log(result);
  return <h1 className="for-observer">Hello world</h1>;
};

export default AppointmentRegistration;
