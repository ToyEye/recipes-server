import express from "express";

import { isValidId } from "../middlewares/index.js";

export const reviewRoute = express.Router();

reviewRoute.get("/:recipeId", isValidId);
