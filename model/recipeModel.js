import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    default: 0,
  },
});

export const Recipe = model("recipe", recipeSchema);
