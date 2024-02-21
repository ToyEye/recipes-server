import express from "express";

import ctrlRecipe from "../controllers/recipe.js";
import {
  isEmptyBody,
  isValidId,
  validateBody,
  isApiKey,
} from "../middlewares/index.js";
import * as recipeSchema from "../model/recipeModel.js";

export const recipeRoute = express.Router();

recipeRoute.get("/", isApiKey, ctrlRecipe.getAllRecipes);

recipeRoute.post(
  "/",
  isApiKey,
  isEmptyBody,
  validateBody(recipeSchema.newRecipeSchema),
  ctrlRecipe.addRecipe
);

recipeRoute.put(
  "/:id",
  isApiKey,
  isEmptyBody,
  isValidId,
  validateBody(recipeSchema.changeVoteSchema),
  ctrlRecipe.changeVote
);

recipeRoute.get("/:id", isValidId, ctrlRecipe.getRecipeById);
