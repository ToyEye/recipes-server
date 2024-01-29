import { ctrlWrapper } from "../decorators/index.js";
import { Recipe, Country } from "../model/index.js";
import { HttpErrors } from "../helpers/index.js";

const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find();

  res.status(200).json(recipes);
};

const addRecipe = async (req, res) => {
  const { name, ingredients, instructions, country } = req.body;

  let findCountry = await Country.findOne({ country });
  if (!findCountry) {
    findCountry = await Country.create({
      country,
      description: "",
      recipes: [],
    });
  }

  const newRecipe = await Recipe.create({
    name,
    ingredients,
    instructions,
    country,
  });
  findCountry.recipes.push(newRecipe._id);
  await findCountry.save();

  res.status(201).json(newRecipe);
};

export default {
  getAllRecipes: ctrlWrapper(getAllRecipes),
  addRecipe: ctrlWrapper(addRecipe),
};
