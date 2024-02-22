import express from "express";

import ctrlReviews from "../controllers/reviews.js";
import {
  isValidId,
  isApiKey,
  isEmptyBody,
  authenticate,
} from "../middlewares/index.js";

export const reviewRoute = express.Router();

reviewRoute.get("/:id/res", isValidId, isApiKey, ctrlReviews.getRecipeReviews);

reviewRoute.post("/", authenticate, isEmptyBody, ctrlReviews.addReview);
