export const getNotBookedAppointments = async (pool, { start, end }) => {
  let connection;
  const query = `SELECT appointments.id,appointments.appointmentDate,appointments.appointmentTime,veterinarians.vetName,veterinarians.lastName FROM appointments LEFT JOIN veterinarians ON veterinarians.id = appointments.veterinarian WHERE (appointmentDate BETWEEN '${start}' AND '${end}') AND pet IS NULL ORDER BY appointmentDate ASC`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

export const getAppointmentById = async (pool, id) => {
  let connection;
  const query = `SELECT appointments.id,appointments.appointmentDate,appointments.appointmentTime,veterinarians.vetName,veterinarians.lastName FROM appointments LEFT JOIN veterinarians ON veterinarians.id = appointments.veterinarian WHERE appointments.id =${id}`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

//
