import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import mariadb from "mariadb";
import dotenv from "dotenv";
import { errorHandler } from "./errorHandler.js";
import { tryCatch } from "./tryCatch.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE_NAME,
  connectionLimit: 5,
});
// ///////////
// REVIEWS
// //////////////
const getReviews = async () => {
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

const postReview = async (reviewText, name, email, stars, todayDate) => {
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

app.post(
  "/api/v1/reviews",
  tryCatch(async (request, response) => {
    const userReview = request.body;
    const today = new Date();
    await postReview(
      userReview.reviewText,
      userReview.name,
      userReview.email,
      userReview.rating,
      today
    );
    return response.status(200).send("Thank you for your review");
  })
);

app.get(
  "/api/v1/reviews",
  tryCatch(async (_, response) => {
    const reviews = await getReviews();
    response.status(200).send(reviews);
  })
);

// SIGNUP

// Appointments
// SQL Query for getting data
const getNotBookedAppointments = async ({ start, end }) => {
  let connection;
  const query = `SELECT appointments.id,appointments.appointmentDate,appointments.appointmentTime,veterinarians.vetName,veterinarians.lastName FROM appointments LEFT JOIN veterinarians ON veterinarians.id = appointments.veterinarian WHERE (appointmentDate BETWEEN '${start}' AND '${end}') AND booked = 0 ORDER BY appointmentDate ASC`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

const getAppointmentById = async (id) => {
  let connection;
  const query = `SELECT appointments.id,appointments.appointmentDate,appointments.appointmentTime,veterinarians.vetName,veterinarians.lastName FROM appointments LEFT JOIN veterinarians ON veterinarians.id = appointments.veterinarian WHERE appointments.id =${id}`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

const getPetById = async (id) => {
  let connection;
  const query = `SELECT pets.petName,pets.species,pets.breed,pets.gender,pets.age,pets.petWeight,COALESCE(appointments.appointmentDate, 'No appointments') AS appointmentDate FROM pets LEFT JOIN appointments ON pets.id = appointments.pet WHERE pets.id = ${id} ORDER BY appointmentDate DESC LIMIT 2`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  console.log("Query result", results);

  if (results[0].appointmentDate === "No appointments") {
    return results[0];
  }
  const singlePetObject = {
    ...results[0],
    appointmentDate: [results[0].appointmentDate, results[1].appointmentDate],
  };
  connection.end();
  return singlePetObject;
};

const getPetDocumentsById = async (id) => {
  let connection;
  const query = `SELECT documents.title,documents.docUrl,documents.sendDate FROM pets LEFT JOIN documents ON pets.id = documents.pet WHERE pets.id = ${id} ORDER BY sendDate DESC`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

const getPetHistoryById = async (id) => {
  let connection;
  const query = `SELECT diagnosis.diagnosisDate,diagnosis.diagnosisDescription FROM pets LEFT JOIN diagnosis ON pets.id = diagnosis.pet WHERE pets.id = ${id}`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

const getUser = async (email) => {
  let connection;
  const query = `SELECT users.clientName, accounts.email,accounts.accountPassword,accounts.userRole, pets.id AS 'petID', pets.petName FROM users LEFT JOIN accounts ON users.account = accounts.id LEFT JOIN pets ON users.id = pets.petOwner WHERE accounts.email ='${email}'`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

const getEmployees = async () => {
  let connection;
  const query = `SELECT veterinarians.id AS 'ID', veterinarians.vetName AS 'Vardas', veterinarians.lastName AS 'Pavardė' FROM veterinarians`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

const getAppointments = async () => {
  let connection;
  const query = `SELECT appointments.id AS 'ID',appointments.appointmentDate AS 'Data',appointments.appointmentTime AS 'Laikas',veterinarians.vetName AS 'Vardas', veterinarians.lastName AS 'Pavardė',pets.petName AS 'Augintinis' FROM appointments LEFT JOIN veterinarians ON appointments.veterinarian = veterinarians.id LEFT JOIN pets ON appointments.pet = pets.id ORDER BY appointmentDate DESC`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

const getProducts = async () => {
  let connection;
  const query = `SELECT products.id, products.title, products.price, products.category, products.imagePath, manufacturer.mName FROM products LEFT JOIN manufacturer ON products.manufacturer = manufacturer.id`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

const getAllProducts = async () => {
  let connection;
  const query = `SELECT products.title AS 'Pavadinimas', products.price AS 'Kaina', products.category AS 'Kategorija', manufacturer.mName AS 'Gamintojas' FROM products LEFT JOIN manufacturer ON products.manufacturer = manufacturer.id`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

const getAllServices = async () => {
  let connection;
  const query = `SELECT services.id,services.title,services.serviceDescription,services.price, servicesCategories.num, servicesCategories.categoryName FROM Services LEFT JOIN CategoriesAndServicesJunction ON serviceID = services.id LEFT JOIN servicesCategories ON categoryID = servicesCategories.id `;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

// Adds day name to the data object which is sent to FE
const addDayName = (dayNumber) => {
  const dayNamesArray = [
    "Sekmadienis",
    "Pirmadienis",
    "Antradienis",
    "Trečiadienis",
    "Ketvirtadienis",
    "Penktadienis",
    "Šeštadienis",
  ];
  const dayName = dayNamesArray[dayNumber];
  return dayName;
};

// ADMIN

app.get(
  "/api/v1/admin/appointments",
  tryCatch(async (request, response) => {
    const allAppointments = await getAppointments();

    return response.status(200).send(allAppointments);
  })
);

app.get(
  "/api/v1/admin/employees",
  tryCatch(async (request, response) => {
    const allEmployees = await getEmployees();
    return response.status(200).send(allEmployees);
  })
);

const categoryById = (categoryID) => {
  let name;
  switch (categoryID) {
    case 1:
      name = "Katės";
      break;
    case 2:
      name = "Šunys";
      break;
    case 3:
      name = "Paukščiai";
      break;
    case 4:
      name = "Kiti";
      break;
    default:
      name = "Nepriskirta";
  }
  return name;
};

app.get(
  "/api/v1/admin/products",
  tryCatch(async (request, response) => {
    const allProducts = await getAllProducts();
    const addCategoryName = (allProductsData) => {
      const newArray = allProductsData.map((product) => {
        return {
          ...product,
          Kategorija: categoryById(product.Kategorija),
        };
      });
      return newArray;
    };
    const newAllProducts = addCategoryName(allProducts);
    return response.status(200).send(newAllProducts);
  })
);

// ADMIN

// SHOP

app.get(
  "/api/v1/shop/products",
  tryCatch(async (request, response) => {
    const allProducts = await getProducts();
    return response.status(200).send(allProducts);
  })
);

// SHOP

// SERVICES

// Fixes services data array. It stores for every service type numbers into one array
const fixDataArray = (data) => {
  if (!data || data.length == 0) return;
  const newArray = [];
  data.forEach((object) => {
    const isServiceIdAdded = newArray.find(
      (arrayObject) => arrayObject.id === object.id
    );

    if (isServiceIdAdded) {
      const indexOfServiceAdded = newArray.findIndex(
        (arrayObject) => arrayObject.id === object.id
      );
      newArray[indexOfServiceAdded] = {
        ...newArray[indexOfServiceAdded],
        categories: [...newArray[indexOfServiceAdded].categories, object.num],
      };
    }

    if (!isServiceIdAdded) {
      newArray.push({
        ...object,
        categories: [object.num],
      });
    }
  });

  return newArray;
};

app.get(
  "/api/v1/services",
  tryCatch(async (request, response) => {
    const allServices = await getAllServices();
    const fixedArray = fixDataArray(allServices);
    return response.status(200).send(fixedArray);
  })
);

// SERVICES

app.get(
  "/api/v1/user/login/",
  tryCatch(async (request, response) => {
    const email = request.query.email;
    const password = request.query.password;
    const userData = await getUser(email);

    const makeSingleUserObject = (arrayOfObjects) => {
      const newObject = { ...arrayOfObjects[0], pets: [] };
      delete newObject.aVardas;
      delete newObject.AugintinioID;
      arrayOfObjects.forEach(({ petID, petName }) => {
        const petObject = {
          petID: petID,
          petName: petName,
        };
        newObject.pets.push(petObject);
      });
      return newObject;
    };

    const singleObject = makeSingleUserObject(userData);

    const doesPasswordsMatch = userData[0].accountPassword === password;

    if (doesPasswordsMatch) {
      if (userData[0].userRole === 1) {
        return response.status(200).send(userData[0]);
      }
      return response.status(200).send(singleObject);
    }
    return response.status(400).send("Klaida, slaptažodžiai nesutampa");
  })
);

app.get(
  "/api/v1/pets/history/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetHistoryById(id);
    return response.status(200).send(result);
  })
);

app.get(
  "/api/v1/pets/documents/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetDocumentsById(id);
    return response.status(200).send(result);
  })
);

app.get(
  "/api/v1/pets/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetById(id);
    return response.status(200).send(result);
  })
);

app.get(
  "/api/v1/appointments",
  tryCatch(async (request, response) => {
    const searchDates = {
      start: request.query.startDate,
      end: request.query.endDate,
    };
    const foundAppointments = await getNotBookedAppointments(searchDates);
    const addedDayNameAndFoundAppointments = foundAppointments.map(
      (appointment) => {
        const newObject = {
          ...appointment,
          dayName: addDayName(appointment.appointmentDate.getDay()),
        };
        return newObject;
      }
    );

    return response.status(200).send(addedDayNameAndFoundAppointments);
  })
);

app.get(
  "/api/v1/appointments/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getAppointmentById(id);
    const singleAppointment = result[0];
    const singleAppointmentWithAddedDayName = {
      ...singleAppointment,
      dayName: addDayName(singleAppointment.appointmentDate.getDay()),
    };

    return response.status(200).send(singleAppointmentWithAddedDayName);
  })
);

// const addAppointments = async (date, time, booked, vet) => {
//   let connection;
//   connection = await pool.getConnection();
//   const query = `INSERT INTO appointments (appointmentDate,appointmentTime,booked,veterinarian) VALUES (?,?,?,?)`;
//   const values = [date, time, booked, vet];
//   await connection.query(query, values);
//   connection.end();
// };

// const createAppointments = async () => {
//   const today = new Date();
//   for (let i = 0; i < 15; i++) {
//     const years = today.getFullYear();
//     const month = today.getMonth() + 1;
//     const day = today.getDate();
//     const fullDate = `${years}-${String(month).padStart(2, 0)}-${String(
//       day
//     ).padStart(2, 0)}`;
//     await addAppointments(fullDate, "14:00", 0, 4);
//     const nextDay = today.getDate() + 1;
//     today.setDate(nextDay);
//     i++;
//   }
// };

const addToServiceCategoriesJunctionTable = async (data) => {
  let connection;

  connection = await pool.getConnection();
  const query = `INSERT INTO CategoriesAndServicesJunction (serviceID,categoryID) VALUES (?,?)`;
  data.forEach((object, index) =>
    object.type.forEach(async (categoryID) => {
      const values = [index + 1, categoryID];
      await connection.query(query, values);
    })
  );
  connection.end();
};

// addToServiceCategoriesJunctionTable(servicesCats);

const addServices = async (services) => {
  let connection;
  connection = await pool.getConnection();
  const query = `INSERT INTO Services (title,serviceDescription,price) VALUES (?,?,?)`;
  services.forEach(async (service) => {
    const values = Object.values(service);
    await connection.query(query, values);
  });
  connection.end();
};

// addServices(servicesData);

// const addProducts = async (productsData) => {
//   let connection;

//   connection = await pool.getConnection();
//   const query = `INSERT INTO Products (title,price,category,manufacturer, imagePath) VALUES (?,?,?,?,?)`;
//   productsData.forEach(async (product) => {
//     const values = Object.values(product);
//     await connection.query(query, values);
//   });
//   connection.end();
// };

// addProducts(Products);

app.use(errorHandler);
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
