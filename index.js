import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";
import pino from 'pino-http';

import "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

initRoutes(app);

app.use("/", express.static("./client/build"));

const port = 3050;
app.listen(port, () => {});

export { app };
