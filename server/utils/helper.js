import pool from "../../server.js";
import { availableSpecies } from "./../data/availableSpecies.js";
import { availableGenders } from "./../data/availableGenders.js";
// Returns dayname by given day number
export const addDayName = (dayNumber) => {
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

// Returns category name by given category ID
export const categoryById = (categoryID) => {
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

// Creates today date string
export const createTodayDateAndTimeString = () => {
  const today = new Date();

  return {
    date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
    time: `${today.getHours()}:${today.getMinutes()}`,
  };
};

// Creates 'categories' object property which stores services category types [array of services id]
export const mergeCategoriesIntoSingleProperty = (data) => {
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

// Merges all user pets into one property [array of pet objects (name,id)]
export const mergePetsIntoSingleProperty = (arrayOfObjects) => {
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

// Adds day name property to every appointment object
export const addsDayNamePropertyToEveryAppointment = (appointments) => {
  return appointments.map((appointment) => {
    const newObject = {
      ...appointment,
      dayName: addDayName(appointment.appointmentDate.getDay()),
    };
    return newObject;
  });
};

// Inserts new rows in appointments table
export const addAppointments = async (pool, date, time, pet = null, vet) => {
  let connection;
  connection = await pool.getConnection();
  const query = `INSERT INTO appointments (appointmentDate,appointmentTime,veterinarian,pet) VALUES (?,?,?,?)`;
  const values = [date, time, vet, pet];
  await connection.query(query, values);
  connection.end();
};

// Function to add new appointments for next 14 days
export const createAppointments = async (pool, vet, pet) => {
  const today = new Date();
  for (let i = 0; i < 15; i++) {
    const years = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const fullDate = `${years}-${String(month).padStart(2, 0)}-${String(
      day
    ).padStart(2, 0)}`;
    await addAppointments(pool, fullDate, "16:00", pet, vet);
    const nextDay = today.getDate() + 1;
    today.setDate(nextDay);
    i++;
  }
};

// Inserts new rows in ServiceCategoriesJunction table
export const insertToServiceCategoriesJunctionTable = async (pool, data) => {
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

// Inserts new rows in services table
export const insertServices = async (pool, services) => {
  let connection;
  connection = await pool.getConnection();
  const query = `INSERT INTO Services (title,serviceDescription,price) VALUES (?,?,?)`;
  services.forEach(async (service) => {
    const values = Object.values(service);
    await connection.query(query, values);
  });
  connection.end();
};

// Inserts new rows in products table
export const insertProducts = async (pool, productsData) => {
  let connection;

  connection = await pool.getConnection();
  const query = `INSERT INTO Products (title,price,category,manufacturer, imagePath) VALUES (?,?,?,?,?)`;
  productsData.forEach(async (product) => {
    const values = Object.values(product);
    await connection.query(query, values);
  });
  connection.end();
};

// Gets user role
const getUserRole = async (userId) => {
  let connection;

  connection = await pool.getConnection();
  const query = `SELECT accounts.userRole FROM accounts WHERE accounts.id = ${userId}`;
  const userRole = await connection.query(query);
  connection.end();
  return userRole[0];
};

// Checks user role
export const checkUserRole = (allowedRoles) => {
  return async (request, response, next) => {
    const userId = request.session.userId;
    if (!userId) {
      return response.status(401).send("Negalite pasiekti šio turinio.");
    }

    const { userRole } = await getUserRole(userId);

    if (!allowedRoles.includes(userRole)) {
      return response.status(401).send("Negalite pasiekti šio turinio.");
    }
    next();
  };
};

export const checkIfAvailableGenderAndSpecies = (specie, gender) => {
  const isGenderAvailable = availableGenders.includes(gender);
  const isSpecieAvailable = availableSpecies.includes(specie);

  return isGenderAvailable && isSpecieAvailable;
};
