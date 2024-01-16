export const getVetAppointments = async (pool) => {
  let connection;
  try {
    const query = `SELECT appointments.appointmentDate AS 'data', appointments.appointmentTime AS 'laikas',pets.id AS 'aID', pets.petName AS 'aVardas', pets.species AS 'rusis' FROM appointments LEFT JOIN pets ON appointments.pet = pets.id WHERE appointments.veterinarian = 2 ORDER BY  appointments.appointmentDate DESC`;
    connection = await pool.getConnection();
    const results = await connection.query(query);
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};
