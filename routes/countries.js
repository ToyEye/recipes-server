import express from "express";

import ctrlCountry from "../controllers/countries.js";
import {
  isEmptyBody,
  isValidId,
  validateBody,
  isApiKey,
} from "../middlewares/index.js";

export const countryRoute = express.Router();

countryRoute.get("/", isApiKey, ctrlCountry.getAllCountries);

countryRoute.get("/:name", isApiKey, isEmptyBody, ctrlCountry.getCountryByName);
