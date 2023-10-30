export const getVetAppointments = async (pool) => {
  let connection;
  const query = `SELECT appointments.appointmentDate AS 'data', appointments.appointmentTime AS 'laikas',pets.id AS 'aID', pets.petName AS 'aVardas', pets.species AS 'rusis' FROM appointments LEFT JOIN pets ON appointments.pet = pets.id WHERE appointments.veterinarian = 2`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};
