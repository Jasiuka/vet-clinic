import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import mariadb from "mariadb";
import dotenv from "dotenv";
import { errorHandler } from "./server/utils/errorHandler.js";
import { createAppointments } from "./server/utils/helper.js";

// Websockets

// Routers
import adminRouter from "./server/lib/routers/adminRouter.js";
import reviewsRouter from "./server/lib/routers/reviewsRouter.js";
import vetRouter from "./server/lib/routers/vetRouter.js";
import petsRouter from "./server/lib/routers/petsRouter.js";
import appointmentsRouter from "./server/lib/routers/appointmentsRouter.js";
import shopRouter from "./server/lib/routers/shopRouter.js";
import clientRouter from "./server/lib/routers/clientRouter.js";
import loggedUserRouter from "./server/lib/routers/loggedUserRouter.js";
import userRouter from "./server/lib/routers/userRouter.js";
import ordersRouter from "./server/lib/routers/ordersRouter.js";
import storageRouter from "./server/lib/routers/storageRouter.js";

// Auth
import session from "express-session";
// import RedisStore from "connect-redis";
// import { createClient } from "redis";

const oneDay = 1000 * 60 * 60 * 24;

dotenv.config();

const app = express();

export const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE_NAME,
  connectionLimit: 5,
});

export default pool;

// let redisClient = createClient();
// redisClient.connect().catch(console.error);

// let redisStore = new RedisStore({
//   client: redisClient,
//   prefix: "vet:",
// });

// createAppointments(pool, 2);

app.set("trust proxy", 1);
app.use(
  session({
    name: "vet clinic",
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: oneDay,
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(adminRouter);
app.use(reviewsRouter);
app.use(vetRouter);
app.use(petsRouter);
app.use(appointmentsRouter);
app.use(clientRouter);
app.use(shopRouter);
app.use(loggedUserRouter);
app.use(userRouter);
app.use(ordersRouter);
app.use(storageRouter);

app.use(errorHandler);
ViteExpress.listen(app, 3000, () => console.log(`Server is listening..  `));
