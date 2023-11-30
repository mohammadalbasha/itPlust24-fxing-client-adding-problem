import express, { Express } from "express";
import cors from 'cors';
import { json } from 'body-parser';
import { GeolocationRouter } from "./modules/geolocation/controllers/geolocation.controller.ts";
import { NotFoundError, errorHandler } from "./shared";


const app = express();

app.use(cors());
app.use(json());

app.use('/geolocation',GeolocationRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
