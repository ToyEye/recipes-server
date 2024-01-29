import express from "express";

import ctrlRecipe from "../controllers/recipe.js";

export const recipeRoute = express.Router();

recipeRoute.get("/get-recipes", ctrlRecipe.getRecipes);
