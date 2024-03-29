export const getPetDocumentsById = async (pool, id) => {
  let connection;
  try {
    const query = `SELECT documents.title,documents.storageId,documents.sendDate FROM pets LEFT JOIN documents ON pets.id = documents.pet WHERE pets.id = ${id} ORDER BY sendDate DESC`;
    connection = await pool.getConnection();
    const results = await connection.query(query);
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const getPetHistoryById = async (pool, id) => {
  let connection;
  try {
    const query = `SELECT diagnosis.diagnosisDate,diagnosis.diagnosisDescription FROM pets LEFT JOIN diagnosis ON pets.id = diagnosis.pet WHERE pets.id = ${id}`;
    connection = await pool.getConnection();
    const results = await connection.query(query);
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const getAllPetAppointmentsById = async (pool, id) => {
  let connection;
  try {
    const query = `SELECT appointments.appointmentDate AS 'Data',appointments.appointmentTime AS 'Laikas', veterinarians.vetName AS 'Vardas', veterinarians.lastName AS 'Pavardė' FROM pets LEFT JOIN appointments ON appointments.pet = pets.id LEFT JOIN veterinarians ON appointments.veterinarian = veterinarians.id WHERE pets.id = ${id} ORDER BY appointmentDate DESC`;
    connection = await pool.getConnection();
    const results = await connection.query(query);
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

// Gets all pet data by pet id
export const getPetById = async (pool, id) => {
  let connection;
  try {
    const query = `SELECT pets.petName,pets.species,pets.breed,pets.gender,pets.age,pets.petWeight,COALESCE(appointments.appointmentDate, 'No appointments') AS appointmentDate FROM pets LEFT JOIN appointments ON pets.id = appointments.pet WHERE pets.id = ${id} ORDER BY appointmentDate DESC LIMIT 2`;
    connection = await pool.getConnection();
    const results = await connection.query(query);

    if (results[0].appointmentDate === "No appointments") {
      return results[0];
    }
    const singlePetObject = {
      ...results[0],
      appointmentDate: [
        results[0].appointmentDate,
        results[1]?.appointmentDate,
      ],
    };
    return singlePetObject;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

// Just checks if user has such pet
export const getPetByPetIdAndUserId = async (pool, petId, userId) => {
  let connection;
  try {
    const query = `SELECT pets.petName,pets.id FROM accounts LEFT JOIN users ON users.account = accounts.id LEFT JOIN pets ON users.id = pets.petOwner WHERE pets.id = ${petId} AND accounts.id = ${userId}`;
    connection = await pool.getConnection();
    const row = await connection.query(query);
    if (!row.length) {
      return false;
    }
    return row[0];
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const createNewPet = async (
  pool,
  petName,
  species,
  breed,
  gender,
  age,
  petWeight,
  petOwner
) => {
  let query, connection, values;
  try {
    // If creating pet for not auth user for appointment booking
    if (!petOwner || !petWeight || !petName) {
      query = `INSERT INTO pets (petName,species,breed,gender,age) VALUES (?,?,?,?,?) RETURNING id`;
      values = [petName, species, breed, gender, age];
    }
    // If auth user creating pet
    query = `INSERT INTO pets (petName,species,breed,gender,age,petWeight,petOwner) VALUES (?,?,?,?,?,?,?) RETURNING id`;
    values = [petName, species, breed, gender, age, petWeight, petOwner];

    connection = await pool.getConnection();
    const row = await connection.query(query, values);
    return row;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

export const createNewPetDocument = async (
  pool,
  storageId,
  title,
  petId,
  dateObj
) => {
  let connection;

  try {
    const query = `INSERT INTO documents (sendDate,sendTime,title,storageId,pet) VALUES (?,?,?,?,?)`;
    connection = await pool.getConnection();
    const values = [dateObj.date, dateObj.time, title, storageId, petId];
    await connection.query(query, values);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

export const createNewDiagnosis = async (pool, date, description, petId) => {
  let connection;
  try {
    const query = `INSERT INTO diagnosis (diagnosisDate,diagnosisDescription,pet) VALUES (?,?,?)`;
    const values = [date, description, petId];
    connection = await pool.getConnection();
    await connection.query(query, values);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

export const deletePet = async (pool, petId) => {
  let connection;
  try {
    const query = `DELETE FROM pets WHERE id = ${petId}`;
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

export const editPet = async (pool, petId, age, weight) => {
  let connection;
  try {
    const query = `UPDATE pets 
    SET 
        age = CASE WHEN ${age} IS NOT NULL AND ${age} != '' THEN ${age} ELSE age END,
        petWeight = CASE WHEN ${weight} IS NOT NULL AND ${weight} != '' THEN ${weight} ELSE petWeight END 
    WHERE 
        id = ${petId};`;
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
