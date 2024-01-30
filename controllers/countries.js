import { ctrlWrapper } from "../decorators/index.js";
import { Recipe, Country } from "../model/index.js";

const getAllCountries = async (req, res) => {
  const countries = await Country.find();

  res.json(countries);
};

const getCountryByName = async (req, res) => {
  const { name } = req.params;
  const country = await Country.findOne({ country: name });

  res.json(country);
};

export default {
  getAllCountries: ctrlWrapper(getAllCountries),
  getCountryByName: ctrlWrapper(getCountryByName),
};
