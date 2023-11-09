export const getAllUserPetsIds = async (pool, userAccountId) => {
  let connection;
  const query = `SELECT pets.id AS 'petID', pets.petName FROM accounts LEFT JOIN users ON accounts.id = users.account LEFT JOIN pets ON users.id = pets.petOwner WHERE accounts.id = ${userAccountId}`;
  connection = await pool.getConnection();
  const pets = await connection.query(query);
  connection.end();
  if (pets.length === 0) return null;
  return pets;
};

export const findUser = async (pool, email) => {
  let connection;
  const query = `SELECT accounts.id, accounts.accountPassword, accounts.userRole FROM accounts WHERE accounts.email = '${email}'`;
  connection = await pool.getConnection();
  const userResult = await connection.query(query);
  connection.end();
  if (userResult.length === 0) {
    return null;
  }
  return userResult;
};

export const createUserAccount = async (
  pool,
  userEmail,
  userPassword,
  userRole
) => {
  let connection;
  try {
    const query = `INSERT INTO accounts (email,accountPassword,userRole) VALUES (?,?,?) RETURNING id`;
    const values = [userEmail, userPassword, userRole];
    connection = await pool.getConnection();
    const result = await connection.query(query, values);
    if (result.length === 0) return false;
    return result[0];
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

export const createUser = async (pool, userObject, accountId) => {
  let connection;
  try {
    const query = `INSERT INTO users (clientName,lastName,phone,account) VALUES (?,?,?,?)`;
    const values = [
      userObject.name,
      userObject.lastName,
      userObject.phone,
      accountId.id,
    ];
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

export const findUserEmail = async (pool, email) => {
  let connection;
  try {
    const query = `SELECT accounts.email FROM accounts WHERE email = '${email}'`;
    connection = await pool.getConnection();
    const result = await connection.query(query);
    if (result.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};
