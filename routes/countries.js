import express from "express";

import ctrlCountry from "../controllers/countries.js";
import { isEmptyBody, isValidId, validateBody } from "../middlewares/index.js";

export const countryRoute = express.Router();

countryRoute.get("/get-countries", ctrlCountry.getAllCountries);

countryRoute.get(
  "/get-countries/:name",
  isEmptyBody,
  ctrlCountry.getCountryByName
);
