import express from "express";

import ctrlRecipe from "../controllers/recipe.js";
import {
  isEmptyBody,
  isValidId,
  validateBody,
  authenticate,
} from "../middlewares/index.js";
import * as recipeSchema from "../model/recipeModel.js";

export const recipeRoute = express.Router();

recipeRoute.get("/", ctrlRecipe.getAllRecipes);

recipeRoute.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(recipeSchema.newRecipeSchema),
  ctrlRecipe.addRecipe
);

recipeRoute.put(
  "/:id",
  isEmptyBody,
  authenticate,
  isValidId,
  validateBody(recipeSchema.changeVoteSchema),
  ctrlRecipe.changeVote
);

recipeRoute.get("/country/:id", isValidId, ctrlRecipe.getRecipeById);

recipeRoute.get("/countries/:country", ctrlRecipe.getRecipesByCountry);

recipeRoute.get("/random", ctrlRecipe.getRandomRecipes);
