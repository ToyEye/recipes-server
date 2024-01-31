import express from "express";

import ctrlCountry from "../controllers/countries.js";
import {
  isEmptyBody,
  isValidId,
  validateBody,
  isApiKey,
} from "../middlewares/index.js";

export const countryRoute = express.Router();

countryRoute.get("/get-countries", isApiKey, ctrlCountry.getAllCountries);

countryRoute.get(
  "/get-countries/:name",
  isApiKey,
  isEmptyBody,
  ctrlCountry.getCountryByName
);
