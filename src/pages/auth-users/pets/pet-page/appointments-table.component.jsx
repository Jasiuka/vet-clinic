import { useState } from "react";
import { useEffect } from "react";
import { RemoveSeconds, FixDate } from "../../../../utils/helper-fncs";
export const AppointmentsTable = ({ appointmentsData }) => {
  const [headings, setHeadings] = useState([]);
  const getHeadings = (appointmentsData) => {
    const headings = [...Object.keys(appointmentsData[0])];
    return headings;
  };

  useEffect(() => {
    if (appointmentsData) {
      setHeadings(getHeadings(appointmentsData));
    }
  }, [appointmentsData]);

  const fixObject = (dataObject) => {
    let fixedObject = {};
    for (const [key, value] of Object.entries(dataObject)) {
      let temp = value;
      if (key.toLowerCase() === "data") {
        temp = FixDate(value);
      }
      if (key.toLowerCase() === "laikas") {
        temp = RemoveSeconds(value);
      }
      fixedObject[key] = temp;
    }
    return fixedObject;
  };

  return (
    <table>
      <thead>
        <tr>
          {headings?.length > 0 &&
            headings.map((heading) => <td key={heading}>{heading}</td>)}
        </tr>
      </thead>
      <tbody>
        {appointmentsData?.map((appointment) => (
          <tr key={appointment.appointmentDate}>
            {Object.values(fixObject(appointment)).map((value) => (
              <td key={value}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentsTable;
