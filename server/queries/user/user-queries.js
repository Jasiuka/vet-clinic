export const getAllUserPetsIds = async (pool, userAccountId) => {
  let connection;
  const query = `SELECT pets.id AS 'petID', pets.petName FROM accounts LEFT JOIN users ON accounts.id = users.account LEFT JOIN pets ON users.id = pets.petOwner WHERE accounts.id = ${userAccountId}`;
  connection = await pool.getConnection();
  const pets = await connection.query(query);
  if (pets.length === 0) return null;
  return pets;
};

export const findUser = async (pool, email) => {
  let connection;
  const query = `SELECT accounts.id, accounts.accountPassword, accounts.userRole FROM accounts WHERE accounts.email = '${email}'`;
  connection = await pool.getConnection();
  const userResult = await connection.query(query);
  if (userResult.length === 0) {
    return null;
  }

  return userResult;
};

export const validatePassword = (password, inputPassword) => {
  return password === inputPassword;
};
