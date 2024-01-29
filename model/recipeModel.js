import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
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
    vote_count: {
      type: Number,
      default: 0,
    },
    vote_bank: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
    },
  },
  { versionKey: false }
);

export const Recipe = model("recipe", recipeSchema);
