import express from "express";

import ctrlReviews from "../controllers/reviews.js";
import {
  isValidId,
  isApiKey,
  isEmptyBody,
  authenticate,
  validateBody,
} from "../middlewares/index.js";
import * as schema from "../model/reviewsModel.js";

export const reviewRoute = express.Router();

reviewRoute.get("/:id", isValidId, isApiKey, ctrlReviews.getRecipeReviews);

reviewRoute.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(schema.createReviewSchema),
  ctrlReviews.addReview
);

reviewRoute.patch(
  "/description",
  isEmptyBody,
  authenticate,
  ctrlReviews.changeReviewById
);
