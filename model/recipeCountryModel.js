import { Schema, model } from "mongoose";

const countrySchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    description: { type: String },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { versionKey: false }
);

export const Country = model("country", countrySchema);
