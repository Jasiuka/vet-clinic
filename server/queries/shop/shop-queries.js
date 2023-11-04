export const getProducts = async (pool) => {
  let connection;
  const query = `SELECT products.id, products.title, products.price, products.category, products.imagePath, manufacturer.mName FROM products LEFT JOIN manufacturer ON products.manufacturer = manufacturer.id`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};
