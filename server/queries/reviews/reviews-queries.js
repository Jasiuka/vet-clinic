export const getReviews = async (pool) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const rows = await connection.query(
      "SELECT userName,reviewText,stars,reviewDate FROM reviews"
    );
    return rows;
  } catch (error) {
    throw new Error(error);
  } finally {
    connection.end();
  }
};

export const postReview = async (pool, reviewText, name, stars, todayDate) => {
  let connection;
  try {
    const insertQuery = `INSERT INTO reviews (userName, reviewText, stars, reviewDate) VALUES (?,?,?,?) RETURNING id`;
    const values = [name, reviewText, stars, todayDate];
    connection = await pool.getConnection();
    const row = await connection.query(insertQuery, values);
    return row[0];
  } catch (error) {
    throw new Error(error);
  } finally {
    connection.end();
  }
};
