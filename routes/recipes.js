import express from "express";

import ctrlRecipe from "../controllers/recipe.js";
import { isEmptyBody } from "../middlewares/index.js";

export const recipeRoute = express.Router();

recipeRoute.get("/get-recipes", ctrlRecipe.getAllRecipes);

recipeRoute.post("/get-recipes", isEmptyBody, ctrlRecipe.addRecipe);
