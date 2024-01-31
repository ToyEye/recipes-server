import express from "express";
import {
  isEmptyBody,
  validateBody,
  authenticate,
} from "../middlewares/index.js";
import * as userSchema from "../model/usersSchema.js";
import ctrlUser from "../controllers/users.js";

export const usersRoute = express.Router();

usersRoute.post(
  "/signup",
  isEmptyBody,
  validateBody(userSchema.signUpSchema),
  ctrlUser.signUp
);

usersRoute.post(
  "/signin",
  isEmptyBody,
  validateBody(userSchema.signInSchema),
  ctrlUser.signIn
);

usersRoute.post("/logout", authenticate, ctrlUser.logout);

usersRoute.patch("/api-key", authenticate, ctrlUser.createApiKey);
