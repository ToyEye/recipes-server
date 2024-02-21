import { ctrlWrapper } from "../controllers/countries.js";

const getRecipeReviews = async (req, res) => {};

const addReview = async (req, res) => {};

const changeReviewById = async (req, res) => {};

const deleteReviewById = async (req, res) => {};

export default {
  getRecipeReviews: ctrlWrapper(getRecipeReviews),
  addReview: ctrlWrapper(addReview),
  changeReviewById: ctrlWrapper(changeReviewById),
  deleteReviewById: ctrlWrapper(deleteReviewById),
};
