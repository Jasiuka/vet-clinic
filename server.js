import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import mariadb from "mariadb";
import dotenv from "dotenv";
import { errorHandler } from "./server/utils/errorHandler.js";
import { tryCatch } from "./server/utils/tryCatch.js";
import { getReviews, postReview } from "./server/reviews/reviews-queries.js";
import {
  getAppointmentById,
  getNotBookedAppointments,
} from "./server/appointments/appointments-queries.js";
import {
  getPetDocumentsById,
  getAllPetAppointmentsById,
  getPetHistoryById,
  getPetById,
} from "./server/pets/pets-queries.js";
import { getUser } from "./server/user/user-queries.js";
import {
  getEmployees,
  getAppointments,
  getAllProducts,
} from "./server/admin/admin-queries.js";
import { getAllServices } from "./server/website/website-queries.js";
import { getProducts } from "./server/shop/shop-queries.js";
import { getVetAppointments } from "./server/vets/vets-queries.js";
import {
  addDayName,
  categoryById,
  mergeCategoriesIntoSingleProperty,
  mergePetsIntoSingleProperty,
  addsDayNamePropertyToEveryAppointment,
} from "./server/utils/helper.js";

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

//////////////////////////////////////////// ENDPOINTS///////////////////////////////////////////////////

// ///////////
// REVIEWS
// //////////////

app.post(
  "/api/v1/reviews",
  tryCatch(async (request, response) => {
    const userReview = request.body;
    const today = new Date();
    await postReview(
      pool,
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
    const reviews = await getReviews(pool);
    response.status(200).send(reviews);
  })
);

// ///////////
// ADMIN
// //////////////

app.get(
  "/api/v1/admin/appointments",
  tryCatch(async (request, response) => {
    const allAppointments = await getAppointments(pool);

    return response.status(200).send(allAppointments);
  })
);

app.get(
  "/api/v1/admin/employees",
  tryCatch(async (request, response) => {
    const allEmployees = await getEmployees(pool);
    return response.status(200).send(allEmployees);
  })
);

app.get(
  "/api/v1/admin/products",
  tryCatch(async (request, response) => {
    const allProducts = await getAllProducts(pool);
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

app.get(
  "/api/v1/admin/columns/tableName",
  tryCatch(async (request, response) => {
    const tableName = request.query.tableName;
    console.log(tableName);
  })
);

// ///////////
// SHOP
// //////////////

app.get(
  "/api/v1/shop/products",
  tryCatch(async (request, response) => {
    const allProducts = await getProducts(pool);
    return response.status(200).send(allProducts);
  })
);

// ///////////
// WEBSITE
// //////////////

app.get(
  "/api/v1/services",
  tryCatch(async (request, response) => {
    const allServices = await getAllServices(pool);
    const fixedArray = mergeCategoriesIntoSingleProperty(allServices);
    return response.status(200).send(fixedArray);
  })
);

// ///////////
// VETS
// //////////////

app.get(
  "/api/v1/vet/appointments/",
  tryCatch(async (request, response) => {
    const vetAppointments = await getVetAppointments(pool);
    return response.status(200).send(vetAppointments);
  })
);

app.get(
  "/api/v1/pets/appointments/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const appointments = await getAllPetAppointmentsById(pool, id);
    return response.status(200).send(appointments);
  })
);

// ///////////
// LOGIN/USER
// //////////////

app.get(
  "/api/v1/user/login/",
  tryCatch(async (request, response) => {
    const email = request.query.email;
    const password = request.query.password;
    const userData = await getUser(pool, email);

    const singleObject = mergePetsIntoSingleProperty(userData);

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

// ///////////
// PETS
// //////////////

app.get(
  "/api/v1/pets/history/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetHistoryById(pool, id);
    return response.status(200).send(result);
  })
);

app.get(
  "/api/v1/pets/documents/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetDocumentsById(pool, id);
    return response.status(200).send(result);
  })
);

app.get(
  "/api/v1/pets/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetById(pool, id);
    return response.status(200).send(result);
  })
);

// ///////////
// APPOINTMENTS
// //////////////

app.get(
  "/api/v1/appointments",
  tryCatch(async (request, response) => {
    const searchDates = {
      start: request.query.startDate,
      end: request.query.endDate,
    };
    const foundAppointments = await getNotBookedAppointments(pool, searchDates);
    const appointments =
      addsDayNamePropertyToEveryAppointment(foundAppointments);
    return response.status(200).send(appointments);
  })
);

app.get(
  "/api/v1/appointments/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getAppointmentById(pool, id);
    const singleAppointment = result[0];
    const singleAppointmentWithAddedDayName = {
      ...singleAppointment,
      dayName: addDayName(singleAppointment.appointmentDate.getDay()),
    };

    return response.status(200).send(singleAppointmentWithAddedDayName);
  })
);

app.use(errorHandler);
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
