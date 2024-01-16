import { useGetVetAppointmentsQuery } from "../../services/api-slice";
import VetAppointmentCard from "./vet-appointment-card.component";
import "./vet-appointments.style.css";
import { RemoveSeconds, FixDate } from "../../utils/helper-fncs";
export const VetAppointments = () => {
  const { data, error, isLoading } = useGetVetAppointmentsQuery();

  return (
    <main className="vet-appointments">
      <h1 className="page-heading">Mano vizitai</h1>
      <div className="vet-appointments__inner">
        {data?.map((appointmentData, index) => {
          if (appointmentData.aID) {
            return (
              <VetAppointmentCard
                key={index}
                petId={appointmentData.aID}
                petName={appointmentData.aVardas}
                date={FixDate(appointmentData.data)}
                time={RemoveSeconds(appointmentData.laikas)}
                species={appointmentData.rusis}
              />
            );
          } else {
            return;
          }
        })}
      </div>
    </main>
  );
};

export default VetAppointments;
