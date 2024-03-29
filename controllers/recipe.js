import { ctrlWrapper } from "../decorators/index.js";
import { Recipe, Country, User } from "../model/index.js";
import { calculateRating } from "../helpers/index.js";

const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({}, "-vote_bank");

  res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findById(id, "-vote_bank");
  res.status(200).json(recipe);
};

const addRecipe = async (req, res) => {
  const { name, ingredients, instructions, country } = req.body;
  const userId = req.user.id;
  let findCountry = await Country.findOne({ country }, "-vote_bank");

  if (!findCountry) {
    findCountry = await Country.create({
      country,
      description: `recipes from the country of ${country}`,
      recipes: [],
    });
  }

  const newRecipe = await Recipe.create({
    name,
    ingredients,
    instructions,
    country,
    add_from: userId,
  });

  await User.findByIdAndUpdate(
    userId,
    { $push: { addedRecipes: newRecipe._id } },
    { new: true }
  );

  findCountry.recipes.push(newRecipe);
  await findCountry.save();

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
  res.status(200).json({ message: "changes success" });
};

const getRecipesByCountry = async (req, res) => {
  const { country } = req.params;

  const countryRecipeList = await Recipe.find({ country }, "-vote_bank");

  res.status(200).json(countryRecipeList);
};

export default {
  getAllRecipes: ctrlWrapper(getAllRecipes),
  addRecipe: ctrlWrapper(addRecipe),
  changeVote: ctrlWrapper(changeVote),
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipesByCountry: ctrlWrapper(getRecipesByCountry),
};
