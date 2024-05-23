import Joi from "joi";
import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "https://generated.vusercontent.net/placeholder.svg",
    },
    owner: {
      type: String,
      required: true,
    },
    vote_average: {
      type: Number,
      default: 0,
    },
    vote_count: {
      type: Number,
      default: 0,
    },
    vote_bank: {
      vote1: { type: Number, default: 0 },
      vote2: { type: Number, default: 0 },
      vote3: { type: Number, default: 0 },
      vote4: { type: Number, default: 0 },
      vote5: { type: Number, default: 0 },
    },
  },
  { versionKey: false }
);

export const newRecipeSchema = Joi.object({
  name: Joi.string().required(),
  instructions: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).required(),
  country: Joi.string().required(),
});

export const changeVoteSchema = Joi.object({
  newVote: Joi.number().required(),
});

export const Recipe = model("recipe", recipeSchema);
