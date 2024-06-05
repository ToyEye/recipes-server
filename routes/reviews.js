import express from "express";

import ctrlReviews from "../controllers/reviews.js";
import {
  isValidId,
  isEmptyBody,
  authenticate,
  validateBody,
} from "../middlewares/index.js";
import * as schema from "../model/reviewsModel.js";

export const reviewRoute = express.Router();

reviewRoute.get("/:id", isValidId, ctrlReviews.getRecipeReviews);

reviewRoute.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(schema.createReviewSchema),
  ctrlReviews.addReview
);

reviewRoute.patch(
  "/:id/description",
  isEmptyBody,
  authenticate,
  ctrlReviews.changeReviewById
);

reviewRoute.delete("/:id", authenticate, ctrlReviews.deleteReviewById);
