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

recipeRoute.get("/recipes", isApiKey, ctrlRecipe.getAllRecipes);

recipeRoute.post(
  "/recipes",
  isApiKey,
  isEmptyBody,
  validateBody(recipeSchema.newRecipeSchema),
  ctrlRecipe.addRecipe
);

recipeRoute.put(
  "/recipes/:id",
  isApiKey,
  isEmptyBody,
  isValidId,
  validateBody(recipeSchema.changeVoteSchema),
  ctrlRecipe.changeVote
);

recipeRoute.get("/recipes/:id", isValidId, ctrlRecipe.getRecipeById);
