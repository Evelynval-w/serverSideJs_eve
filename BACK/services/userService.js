import User from "../models/userModel.js";

export const findUserByEmail = (email) => {
  return User.findOne({ email });
};