export const getAllServices = async (pool) => {
  let connection;
  const query = `SELECT services.id,services.title,services.serviceDescription,services.price, servicesCategories.num, servicesCategories.categoryName FROM Services LEFT JOIN CategoriesAndServicesJunction ON serviceID = services.id LEFT JOIN servicesCategories ON categoryID = servicesCategories.id `;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};
