import { ctrlWrapper } from "../decorators/index.js";
import { Recipe, Country, User } from "../model/index.js";
import { HttpErrors, calculateRating } from "../helpers/index.js";

import fs from "fs/promises";
import path from "path";

const countryPath = path.resolve("db", "countries.json");

const getAllRecipes = async (req, res) => {
  const { page, per_page } = req.query;

  const skip = (page - 1) * per_page;

  const recipes = await Recipe.find({}, "-vote_bank", {
    skip,
    limit: per_page,
  });

  res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findById(id, "-vote_bank");
  res.status(200).json(recipe);
};

const addRecipe = async (req, res) => {
  const { name, ingredients, instructions, country, description } = req.body;

  const userId = req.user.id;

  const findCountry = await Country.findOne({ country }, "-vote_bank");

  if (!findCountry) {
    try {
      const countryList = JSON.parse(await fs.readFile(countryPath));

      const modernCountry = countryList.filter(
        ({ country: newCountry }) => newCountry === country
      );

      if (!modernCountry.length) {
        throw HttpErrors(400, "country doesn't exist");
      } else {
        await Country.create({ ...modernCountry[0] });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  const newRecipe = await Recipe.create({
    name,
    ingredients,
    instructions,
    description,
    country,
    owner: userId,
  });

  await User.findByIdAndUpdate(
    userId,
    { $push: { addedRecipes: newRecipe._id } },
    { new: true }
  );

  res.status(201).json(newRecipe);
};

const changeVote = async (req, res) => {
  const { id } = req.params;
  const { newVote } = req.body;

  const recipe = await Recipe.findById(id, "vote_count vote_bank");

  const newBody = {
    vote_count: recipe.vote_count + 1,
    vote_average: calculateRating(recipe.vote_bank),
    vote_bank: {
      ...recipe.vote_bank,
      [newVote]: recipe.vote_bank[newVote] + 1,
    },
  };

  await Recipe.findByIdAndUpdate(id, newBody);
  res.status(200).json(newBody);
};

const getRecipesByCountry = async (req, res) => {
  const { country } = req.params;

  const countryRecipeList = await Recipe.find({ country }, "-vote_bank");

  res.status(200).json(countryRecipeList);
};

const getRandomRecipes = async (req, res) => {
  const recipes = await Recipe.find({}, "-vote_bank");

  if (recipes.length < 3) {
    return "The array must contain at least 3 elements";
  }

  let randomElements = [];

  while (randomElements.length < 3) {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIndex];

    if (!randomElements.some((recipe) => recipe._id === randomRecipe._id)) {
      randomElements.push(randomRecipe);
    }
  }

  res.status(200).json(randomElements);
};

export default {
  getAllRecipes: ctrlWrapper(getAllRecipes),
  addRecipe: ctrlWrapper(addRecipe),
  changeVote: ctrlWrapper(changeVote),
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipesByCountry: ctrlWrapper(getRecipesByCountry),
  getRandomRecipes: ctrlWrapper(getRandomRecipes),
};
