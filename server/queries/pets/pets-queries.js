export const getPetDocumentsById = async (pool, id) => {
  let connection;
  const query = `SELECT documents.title,documents.docUrl,documents.sendDate FROM pets LEFT JOIN documents ON pets.id = documents.pet WHERE pets.id = ${id} ORDER BY sendDate DESC`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

export const getPetHistoryById = async (pool, id) => {
  let connection;
  const query = `SELECT diagnosis.diagnosisDate,diagnosis.diagnosisDescription FROM pets LEFT JOIN diagnosis ON pets.id = diagnosis.pet WHERE pets.id = ${id}`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

export const getAllPetAppointmentsById = async (pool, id) => {
  let connection;
  const query = `SELECT appointments.appointmentDate AS 'Data',appointments.appointmentTime AS 'Laikas', veterinarians.vetName AS 'Vardas', veterinarians.lastName AS 'Pavardė' FROM pets LEFT JOIN appointments ON appointments.pet = pets.id LEFT JOIN veterinarians ON appointments.veterinarian = veterinarians.id WHERE pets.id = ${id} ORDER BY appointmentDate DESC`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

export const getPetById = async (pool, id) => {
  let connection;
  const query = `SELECT pets.petName,pets.species,pets.breed,pets.gender,pets.age,pets.petWeight,COALESCE(appointments.appointmentDate, 'No appointments') AS appointmentDate FROM pets LEFT JOIN appointments ON pets.id = appointments.pet WHERE pets.id = ${id} ORDER BY appointmentDate DESC LIMIT 2`;
  connection = await pool.getConnection();
  const results = await connection.query(query);

  if (results[0].appointmentDate === "No appointments") {
    return results[0];
  }
  const singlePetObject = {
    ...results[0],
    appointmentDate: [results[0].appointmentDate, results[1].appointmentDate],
  };
  connection.end();
  return singlePetObject;
};
