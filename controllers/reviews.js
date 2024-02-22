import { ctrlWrapper } from "../decorators/ctrlWrapper.js";
import { Recipe, Review } from "../model/index.js";

const getRecipeReviews = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review({ recipe: id });

  res.status(200).json(reviews);
};

const addReview = async (req, res) => {
  const id = req.user.id;
  const { description, author } = req.body;

  const review = await Review.create({ author, description, recipe: id });

  res.status(200).json(review);
};

const changeReviewById = async (req, res) => {};

const deleteReviewById = async (req, res) => {};

export default {
  getRecipeReviews: ctrlWrapper(getRecipeReviews),
  addReview: ctrlWrapper(addReview),
  changeReviewById: ctrlWrapper(changeReviewById),
  deleteReviewById: ctrlWrapper(deleteReviewById),
};
