export const getProducts = async (pool) => {
  let connection;
  const query = `SELECT products.id, products.title, products.price, products.category, products.imagePath, manufacturer.mName FROM products LEFT JOIN manufacturer ON products.manufacturer = manufacturer.id`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

export const getProductById = async (pool, productId) => {
  let connection;
  try {
    const query = `SELECT products.title,products.price,products.imagePath FROM products WHERE id = ${productId}`;
    connection = pool.getConnection();
    const row = connection.query(query);
    return row[0];
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

export const createNewOrder = async (
  pool,
  userEmail,
  userId,
  userPhone,
  orderState,
  totalOrderPrice,
  clientFullName
) => {
  let connection;
  try {
    let query;
    let values = [];
    if (!userId) {
      query = `INSERT INTO orders (totalPrice,email,orderState,phone, fullName) VALUES (?,?,?,?,?) RETURNING id`;
      values = [
        totalOrderPrice,
        userEmail,
        orderState,
        userPhone,
        clientFullName,
      ];
    }
    query = `INSERT INTO orders (totalPrice,user,email,orderState,phone, fullName) VALUES (?,?,?,?,?,?) RETURNING id`;
    values = [
      totalOrderPrice,
      userId,
      userEmail,
      orderState,
      userPhone,
      clientFullName,
    ];

    connection = await pool.getConnection();
    const row = await connection.query(query, values);
    return row[0];
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};

export const createOrderedProductDetail = async (
  pool,
  orderId,
  productId,
  productQuantity
) => {
  let connection;
  try {
    const query = `INSERT INTO orderedProductsDetails (quantity,productID,orderID) VALUES (?,?,?) `;
    const values = [productQuantity, productId, orderId];
    connection = await pool.getConnection();
    const row = await connection.query(query, values);
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    connection.end();
  }
};
