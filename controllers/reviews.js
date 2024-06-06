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
  const { _id } = req.user;
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw HttpErrors(404);
  }

  const review = await Review.create({
    author,
    description,
    recipeId,
    owner: _id,
  });
  res.status(200).json(review);
};

const changeReviewById = async (req, res) => {
  const { id } = req.params;

  const { description } = req.body;
  const { _id } = req.user;

  const newDescription = await Review.findByIdAndUpdate(
    { _id: id, owner: _id },
    { $set: { description: description } },
    {
      new: true,
    }
  );
  res.status(200).json(newDescription.description);
};

const deleteReviewById = async (req, res) => {
  const { id } = req.params;

  const { _id } = req.user;

  const deletedReview = await Review.findOneAndDelete({ _id: id, owner: _id });
  if (!deletedReview) {
    throw HttpErrors(400);
  }

  res.status(200).json({ message: "Review deleted" });
};

export default {
  getRecipeReviews: ctrlWrapper(getRecipeReviews),
  addReview: ctrlWrapper(addReview),
  changeReviewById: ctrlWrapper(changeReviewById),
  deleteReviewById: ctrlWrapper(deleteReviewById),
};
