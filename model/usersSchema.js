import Joi from "joi";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    apiKey: { type: String, default: "" },
    token: { type: String, default: "" },
  },
  { versionKey: false }
);

export const signUpSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const User = model("user", userSchema);
