export const getNotBookedAppointments = async (pool, { start, end }) => {
  let connection;
  try {
    const query = `SELECT appointments.id,appointments.appointmentDate,appointments.appointmentTime,veterinarians.vetName,veterinarians.lastName FROM appointments LEFT JOIN veterinarians ON veterinarians.id = appointments.veterinarian WHERE (appointmentDate BETWEEN '${start}' AND '${end}') AND pet IS NULL ORDER BY appointmentDate ASC`;
    connection = await pool.getConnection();
    const results = await connection.query(query);
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const getAppointmentById = async (pool, id) => {
  let connection;
  try {
    const query = `SELECT appointments.id,appointments.appointmentDate,appointments.appointmentTime,veterinarians.vetName,veterinarians.lastName,appointments.pet FROM appointments LEFT JOIN veterinarians ON veterinarians.id = appointments.veterinarian WHERE appointments.id =${id}`;
    connection = await pool.getConnection();
    const results = await connection.query(query);
    return results[0];
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const bookPet = async (pool, appointmentId, petId, reason) => {
  let connection;
  try {
    const query = `UPDATE appointments SET pet = ${petId}, reason = '${reason}' WHERE id = ${appointmentId}`;
    connection = await pool.getConnection();
    await connection.query(query);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

//
