import { Schema, model } from "mongoose";
import Joi from "joi";

const reviewsSchema = new Schema(
  {
    author: {
      type: String,
      default: "Anonymous",
    },
    description: {
      type: String,
      required: true,
    },
    recipeId: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

export const createReviewSchema = Joi.object({
  author: Joi.string(),
  description: Joi.string().max(400).required(),
});

export const Review = model("review", reviewsSchema);
