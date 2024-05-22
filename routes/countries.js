import express from "express";

import ctrlCountry from "../controllers/countries.js";
import { isEmptyBody, isValidId, validateBody } from "../middlewares/index.js";

export const countryRoute = express.Router();

countryRoute.get("/", ctrlCountry.getAllCountries);

countryRoute.get("/:name", isEmptyBody, ctrlCountry.getCountryByName);
