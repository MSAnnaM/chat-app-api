import User from "../db/models/userModel.js";

export const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user || {};

    const user = await User.findById(_id);

    res.status(201).json(user);
  } catch (er) {
    next(er);
  }
};
