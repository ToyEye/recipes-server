import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import { User } from "../model/usersSchema.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpErrors } from "../helpers/index.js";

const { SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw HttpErrors(400, "Passwords must match");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw HttpErrors(409, "Email already has been register");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, name, password: hashPassword });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({ user: { email, name }, token });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpErrors(401, "Email or password invalid ");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpErrors(401, "Email or password invalid ");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    user: {
      email: user.email,
      name: user.name,
    },
    token,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "logout success" });
};

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;

  const currentUser = await User.findById(_id);

  res.json({ user: currentUser.name, email: currentUser.email });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  logout: ctrlWrapper(logout),
  getCurrentUser: ctrlWrapper(getCurrentUser),
};
