import { ctrlWrapper } from "../decorators/index.js";

const getRecipes = (req, res) => {
  res.status(200).json({ message: "success" });
};

export default {
  getRecipes: ctrlWrapper(getRecipes),
};
