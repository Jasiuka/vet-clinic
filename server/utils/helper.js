import pool from "../../server.js";
import { availableSpecies } from "./../data/availableSpecies.js";
import { availableGenders } from "./../data/availableGenders.js";
import {
  getAllUserPetsIds,
  getUserIdAndNameByAccountId,
} from "../queries/user/user-queries.js";
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

// Creates now date and time but + 1 hour

export const createDateTimeOneHourLater = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(
    2,
    "0"
  )} ${now.getHours()}:${now.getMinutes()} `;
};

// Changes date format to lithuanian format
export const ChangeDateFormat = (dateToChange) => {
  const date = new Date(`${dateToChange}`);
  const fixedDate = date.toLocaleString("lt-LT");
  return fixedDate;
};

// Check which if date older than today date
export const CheckDate = (dateToCheck) => {
  const today = new Date();
  const givenDate = new Date(dateToCheck);
  return today > givenDate;
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

export const checkIfUserHasPet = () => {
  return async (request, response, next) => {
    const accountId = request.session.userId;
    // Check if user role is veterinarian
    const { userRole } = await getUserRole(accountId);
    if (userRole === 3) {
      return next();
    }
    // If it's not veterinarian check if user has this pet.
    const petId = request.query.id;
    const userPets = await getAllUserPetsIds(pool, accountId);
    const userHasPet = userPets.some((userPet) => userPet.petID == petId);
    if (!userHasPet) {
      return response.status(401).send("Negalite pasiekti šio turinio.");
    }

    return next();
  };
};

export const checkIfAvailableGenderAndSpecies = (specie, gender) => {
  const isGenderAvailable = availableGenders.includes(gender);
  const isSpecieAvailable = availableSpecies.includes(specie);

  return isGenderAvailable && isSpecieAvailable;
};

export const checkIfNewPetFormNumbersGreaterThan = (greaterThan, ...args) => {
  const numbersToCheck = args;

  const atLeastOneGreater = numbersToCheck.some(
    (number) => number > greaterThan
  );
  return atLeastOneGreater;
};

export const checkIfStringHasNumberOrSymbol = (...args) => {
  const strings = args;

  const atLeastOneHasNumberOrSymbol = strings.some((string) =>
    /[\d\W]/.test(string)
  );
  return atLeastOneHasNumberOrSymbol;
};

export const checkIfAtLeastOneInputHasNoValue = (
  inputsArray,
  values = null
) => {
  if (!values) {
    // Remove last element (button)
    inputsArray.pop();
    return inputsArray.some((input) => input?.value.trim() === "");
  } else {
    return values.some((value) => value.trim() === "");
  }
};

export const checkPhoneNumberFormat = (phoneNumber) => {
  const regex = /^\+[\d]+$/; // Should not contain letters, symbols after '+', only numbers and + as first char.
  return regex.test(phoneNumber);
};

export const orderFormValidation = () => {
  return (request, response, next) => {
    const { email, fullName, phone, shippingPrice, rules, payment } =
      request.body;

    if (!rules) {
      return response.status(400).send({
        message: "Turite sutikti su taisyklėmis",
        type: "error",
      });
    }

    // Check if phone number format correct
    const isPhoneNumberCorrectFormat = checkPhoneNumberFormat(phone);
    if (!isPhoneNumberCorrectFormat) {
      return response.status(400).send({
        message: "Neteisingas tel. numerio formatas!",
        type: "error",
      });
    }

    const userDetailsAtLeastOneEmpty = checkIfAtLeastOneInputHasNoValue(null, [
      fullName,
      email,
      phone,
    ]);

    if (userDetailsAtLeastOneEmpty) {
      return response.status(400).send({
        message: "Prašome užpildyti savo asmens duomenis!",
        type: "error",
      });
    }

    if (shippingPrice == 2.99) {
      const { address, city, postal } = request.body;
      // Check if all user address inputs filled

      const atLeastOneAddressEmpty = checkIfAtLeastOneInputHasNoValue(null, [
        address,
        city,
        postal,
      ]);

      if (atLeastOneAddressEmpty) {
        return response.status(400).send({
          message: "Prašome užpildyti savo gyvenamosis vietos duomenis!",
          type: "error",
        });
      }
    }

    // Check if user selected shipping method:
    if (shippingPrice != 0 && shippingPrice != 2.99) {
      return response.status(400).send({
        message: "Prašome pasirinkti pristatymo būdą",
        type: "error",
      });
    }

    // check if user selected payment method:
    if (payment != "clinic" && payment != "card") {
      return response.status(400).send({
        message: "Prašome pasirinkti apmokėjimo būdą",
        type: "error",
      });
    }
    next();
  };
};
