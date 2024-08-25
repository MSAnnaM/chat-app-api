import User from "../db/models/userModel.js";
import HttpError from "../helpers/HttpError.js";

export const getUser = async (req, res, next) => {
    try {
        const {_id} = req.user || {};

      
    // const { firstName, lastName } = req.body;
    const user = await User.findById(_id);
    // if (existingChat) {
    //   throw HttpError(409, "Chat already exists");
    // }

    // const newChat = await Chat.create({ firstName, lastName, messages: [] });

    res.status(201).json(user);
  } catch (er) {
    next(er);
  }
};