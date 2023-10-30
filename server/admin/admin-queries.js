export const getEmployees = async (pool) => {
  let connection;
  const query = `SELECT veterinarians.id AS 'ID', veterinarians.vetName AS 'Vardas', veterinarians.lastName AS 'Pavardė' FROM veterinarians`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

export const getAppointments = async (pool) => {
  let connection;
  const query = `SELECT appointments.id AS 'ID',appointments.appointmentDate AS 'Data',appointments.appointmentTime AS 'Laikas',veterinarians.vetName AS 'Vardas', veterinarians.lastName AS 'Pavardė',pets.petName AS 'Augintinis' FROM appointments LEFT JOIN veterinarians ON appointments.veterinarian = veterinarians.id LEFT JOIN pets ON appointments.pet = pets.id ORDER BY appointmentDate DESC`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

export const getAllProducts = async (pool) => {
  let connection;
  const query = `SELECT products.title AS 'Pavadinimas', products.price AS 'Kaina', products.category AS 'Kategorija', manufacturer.mName AS 'Gamintojas' FROM products LEFT JOIN manufacturer ON products.manufacturer = manufacturer.id`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};
