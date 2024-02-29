import { ctrlWrapper } from "../decorators/ctrlWrapper.js";
import { HttpErrors } from "../helpers/HttpErrors.js";
import { Recipe, Review } from "../model/index.js";

const getRecipeReviews = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ recipeId: id });

  res.status(200).json(reviews);
};

const addReview = async (req, res) => {
  const { description, author, recipeId } = req.body;
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw HttpErrors(404);
  }

  const review = await Review.create({ author, description, recipeId });
  res.status(200).json(review);
};

const changeReviewById = async (req, res) => {
  const { id, description } = req.body;

  const newDescription = await Review.findByIdAndUpdate(
    id,
    { $set: { description: description } },
    {
      new: true,
    }
  );
  res.status(200).json(newDescription);
};

const deleteReviewById = async (req, res) => {};

export default {
  getRecipeReviews: ctrlWrapper(getRecipeReviews),
  addReview: ctrlWrapper(addReview),
  changeReviewById: ctrlWrapper(changeReviewById),
  deleteReviewById: ctrlWrapper(deleteReviewById),
};
