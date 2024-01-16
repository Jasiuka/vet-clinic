import { createDateTimeOneHourLater } from "../../utils/helper.js";
export const getAllUserPetsIds = async (pool, userAccountId) => {
  let connection;
  try {
    const query = `SELECT pets.id AS 'petID', pets.petName, pets.species, latest_appt.appointmentDate 
    FROM accounts 
    LEFT JOIN users ON accounts.id = users.account 
    LEFT JOIN pets ON users.id = pets.petOwner 
    LEFT JOIN (
        SELECT pet, MAX(appointmentDate) AS appointmentDate 
        FROM appointments 
        GROUP BY pet
    ) AS latest_appt ON latest_appt.pet = pets.id 
    WHERE accounts.id = ${userAccountId}`;
    connection = await pool.getConnection();
    const pets = await connection.query(query);
    if (!pets[0].petID) return null;
    return pets;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const findUser = async (pool, email) => {
  let connection;
  try {
    const query = `SELECT accounts.id, accounts.accountPassword, accounts.userRole, users.review, accounts.verified FROM accounts LEFT JOIN users ON users.account = accounts.id WHERE accounts.email = '${email}'`;
    connection = await pool.getConnection();
    const userResult = await connection.query(query);
    if (userResult.length === 0) {
      return null;
    }
    return userResult;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const getAccountVerified = async (pool, verifyCode) => {
  let connection;
  try {
    const query = `SELECT accounts.code, accounts.id, accounts.expires, accounts.verified FROM accounts WHERE accounts.code = '${verifyCode}'`;
    connection = await pool.getConnection();
    const userResult = await connection.query(query);
    if (userResult.length === 0) {
      return null;
    }
    return userResult;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const verifyAccount = async (pool, accountId) => {
  let connection;
  try {
    const query = `UPDATE accounts SET verified = 1, expires = null, code = null WHERE accounts.id = '${accountId}'`;
    connection = await pool.getConnection();
    const result = await connection.query(query);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const setUserCode = async (pool, accountEmail, code) => {
  let connection;
  try {
    const query = `UPDATE accounts SET expires = '${createDateTimeOneHourLater()}', code = '${code}' WHERE accounts.email = '${accountEmail}'`;
    connection = await pool.getConnection();
    await connection.query(query);
    // return result;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

export const checkUserCode = async (pool, code) => {
  let connection;
  try {
    const query = `SELECT accounts.id FROM accounts WHERE accounts.code = '${code}'`;
    connection = await pool.getConnection();
    const result = await connection.query(query);
    if (result.length) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

export const resetUserCodeAndExpires = async (pool, code) => {
  let connection;
  try {
    const query = `UPDATE accounts SET expires = null, code = null WHERE accounts.code = '${code}'`;
    connection = await pool.getConnection();
    const result = await connection.query(query);
    if (result.length) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

export const resetUserPassword = async (pool, code, password) => {
  let connection;
  try {
    const query = `UPDATE accounts SET expires = null, code = null, accountPassword = '${password}' WHERE accounts.code = '${code}'`;
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

export const checkIfUserCodeExpired = async (pool, code) => {
  let connection;
  try {
    const query = `SELECT accounts.id FROM accounts WHERE accounts.code = '${code}' AND accounts.expires > NOW()`;
    connection = await pool.getConnection();
    const result = await connection.query(query);
    if (result.length) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

export const getUserIdByEmail = async (pool, email) => {
  let connection;
  try {
    const query = `SELECT users.id FROM accounts LEFT JOIN users ON users.account = accounts.id WHERE accounts.email = '${email}'`;
    connection = await pool.getConnection();
    const userResultRow = await connection.query(query);
    if (userResultRow.length === 0) {
      return null;
    }
    return userResultRow[0];
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const getUserIdAndNameByAccountId = async (pool, accountId) => {
  let connection;
  try {
    const query = `SELECT users.id, users.userName, users.lastName, users.review,users.phone,accounts.email FROM accounts LEFT JOIN users ON users.account = accounts.id WHERE accounts.id = '${accountId}'`;
    connection = await pool.getConnection();
    const userResultRow = await connection.query(query);
    if (userResultRow.length === 0) {
      return null;
    }
    return userResultRow[0];
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const getUserEmail = async (pool, accountId) => {
  let connection;
  try {
    const query = `SELECT accounts.email FROM accounts WHERE id = ${accountId}`;
    connection = pool.getConnection();
    const row = connection.query(query);
    return row[0];
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const createUserAccount = async (
  pool,
  userEmail,
  userPassword,
  userRole,
  verifyCode
) => {
  let connection;
  try {
    const query = `INSERT INTO accounts (email,accountPassword,userRole, verified,expires,code) VALUES (?,?,?,?,?,?) RETURNING id`;
    const values = [
      userEmail,
      userPassword,
      userRole,
      false,
      createDateTimeOneHourLater(),
      verifyCode,
    ];
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
    const query = `INSERT INTO users (userName,lastName,phone,account) VALUES (?,?,?,?)`;
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

export const updateUserReview = async (pool, reviewId, userId) => {
  let connection;
  try {
    const query = `UPDATE Users SET review = ${reviewId} WHERE users.id = ${userId}`;
    connection = await pool.getConnection();

    await connection.query(query);
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const getUserOrdersByAccountId = async (pool, accountId) => {
  let connection;
  try {
    const query = `SELECT orders.id,orders.totalPrice, orders.orderState, orders.orderDate, orderedproductsdetails.quantity, products.title, products.price
    FROM Accounts LEFT JOIN users ON users.account = accounts.id
     LEFT JOIN orders ON orders.user = users.id LEFT JOIN orderedproductsdetails ON orderedproductsdetails.orderID = orders.id
      LEFT JOIN products ON orderedproductsdetails.productID = products.id WHERE Accounts.id = ${accountId};`;
    connection = await pool.getConnection();
    const rows = await connection.query(query);
    if (!rows[0]?.id) {
      return null;
    }
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

export const getUserReviewByAccountId = async (pool, accountId) => {
  let connection;
  try {
    const query = `SELECT reviews.id FROM accounts LEFT JOIN users ON users.account = accounts.id LEFT JOIN reviews ON users.review = reviews.id WHERE accounts.id = ${accountId}`;
    connection = await pool.getConnection();
    const rows = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  }
};
