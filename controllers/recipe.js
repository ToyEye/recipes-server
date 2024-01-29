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
      description: `recipes from the country of ${country}`,
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

const changeVote = async (req, res) => {
  const { id } = req.params;
  const { newVote } = req.body;

  const { vote_count, vote_bank } = await Recipe.findById(
    id,
    "vote_count vote_bank"
  );

  function calculateRating(votes) {
    let totalScore = 0;
    let totalVotes = 0;

    for (let score in votes) {
      if (votes.hasOwnProperty(score)) {
        totalScore += parseInt(score) * votes[score];
        totalVotes += votes[score];
      }
    }

    if (totalVotes === 0) {
      return 0;
    }

    const rating = totalScore / totalVotes;
    return rating;
  }

  const newBody = {
    vote_count: vote_count + 1,
    vote_average: calculateRating(vote_bank),
    vote_bank: { ...vote_bank, [newVote]: vote_bank[newVote] + 1 },
  };

  await Recipe.findByIdAndUpdate(id, newBody);
  res.status(200).json({ message: "changes success" });
};

export default {
  getAllRecipes: ctrlWrapper(getAllRecipes),
  addRecipe: ctrlWrapper(addRecipe),
  changeVote: ctrlWrapper(changeVote),
};
