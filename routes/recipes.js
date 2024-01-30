import express from "express";

import ctrlRecipe from "../controllers/recipe.js";
import { isEmptyBody, isValidId } from "../middlewares/index.js";

export const recipeRoute = express.Router();

recipeRoute.get("/get-recipes", ctrlRecipe.getAllRecipes);

recipeRoute.post("/get-recipes", isEmptyBody, ctrlRecipe.addRecipe);

recipeRoute.put(
  "/get-recipes/:id",
  isEmptyBody,
  isValidId,
  ctrlRecipe.changeVote
);

recipeRoute.get("/get-recipes/:id", isValidId, ctrlRecipe.getRecipeById);
