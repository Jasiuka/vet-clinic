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

export const postReview = async (
  pool,
  reviewText,
  name,
  email,
  stars,
  todayDate
) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const insertQuery = `INSERT INTO reviews (userName, email, reviewText, stars, reviewDate) VALUES (?,?,?,?,?)`;
    const values = [name, email, reviewText, stars, todayDate];

    await connection.query(insertQuery, values);
  } catch (error) {
    throw new Error(error);
  } finally {
    connection.end();
  }
};
