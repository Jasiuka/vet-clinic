export const getUser = async (pool, email) => {
  let connection;
  const query = `SELECT users.clientName, accounts.email,accounts.accountPassword,accounts.userRole, pets.id AS 'petID', pets.petName FROM users LEFT JOIN accounts ON users.account = accounts.id LEFT JOIN pets ON users.id = pets.petOwner WHERE accounts.email ='${email}'`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
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
