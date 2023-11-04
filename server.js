import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import mariadb from "mariadb";
import dotenv from "dotenv";
import { errorHandler } from "./server/utils/errorHandler.js";

// Routers
import loginRouter from "./server/lib/routers/loginRouter.js";
import reviewsRouter from "./server/lib/routers/reviewsRouter.js";
import adminRouter from "./server/lib/routers/adminRouter.js";
import vetRouter from "./server/lib/routers/vetRouter.js";
import petsRouter from "./server/lib/routers/petsRouter.js";
import appointmentsRouter from "./server/lib/routers/appointmentsRouter.js";
import shopRouter from "./server/lib/routers/shopRouter.js";
import clientRouter from "./server/lib/routers/clientRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(loginRouter);
app.use(reviewsRouter);
app.use(adminRouter);
app.use(vetRouter);
app.use(petsRouter);
app.use(appointmentsRouter);
app.use(clientRouter);
app.use(shopRouter);

export const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE_NAME,
  connectionLimit: 5,
});

app.use(errorHandler);
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

export default pool;
