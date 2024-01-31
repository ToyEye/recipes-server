import { User } from "../model/usersSchema.js";
import { HttpErrors } from "../helpers/HttpErrors.js";

export const isApiKey = async (req, res, next) => {
  const { api_key } = req.query;

  if (!api_key) {
    throw HttpErrors(401, "API key is missing");
  }

  const user = await User.findOne({ apiKey: api_key });

  if (!user) {
    next(HttpErrors(401, "API key is not valid"));
  }

  next();
};
