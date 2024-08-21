import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

export const checkIsValidId = (req, _, next) => {
  const { chatId} = req.params;

  const id = chatId;

  if (!isValidObjectId(id)) {
    return next(HttpError(400, `Requested id(${id}) is invalid`));
  }

  next();
};
