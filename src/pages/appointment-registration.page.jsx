import { useParams } from "react-router-dom";
export const AppointmentRegistration = () => {
  let { id } = useParams();
  // const result = appointmentsApi.endpoints.getAppointmentsByDateRange;
  console.log(id);
  return <h1 className="for-observer">Hello world</h1>;
};

export default AppointmentRegistration;
