import express from "express";

import ctrlRecipe from "../controllers/recipe.js";
import { isEmptyBody, isValidId, validateBody } from "../middlewares/index.js";
import * as recipeSchema from "../model/recipeModel.js";

export const recipeRoute = express.Router();

recipeRoute.get("/get-recipes", ctrlRecipe.getAllRecipes);

recipeRoute.post(
  "/get-recipes",
  isEmptyBody,
  validateBody(recipeSchema.newRecipeSchema),
  ctrlRecipe.addRecipe
);

recipeRoute.put(
  "/get-recipes/:id",
  isEmptyBody,
  isValidId,
  validateBody(recipeSchema.changeVoteSchema),
  ctrlRecipe.changeVote
);

recipeRoute.get("/get-recipes/:id", isValidId, ctrlRecipe.getRecipeById);
