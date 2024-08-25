import express from "express";
import { deleteChat, getAllChats, newChatController, sendMessage, updateChat } from "../controllers/chatControllers.js";
import { checkIsValidId } from "../midellwares/isValidId.js";
import ensureAuthenticated from "../midellwares/auth.js";

const chatRouter = express.Router();
chatRouter.post('/create', ensureAuthenticated, newChatController);
chatRouter.get("/",
    ensureAuthenticated,
    getAllChats);
chatRouter.patch("/:chatId", checkIsValidId, updateChat);
chatRouter.delete("/:chatId", checkIsValidId, deleteChat);
chatRouter.post("/:chatId/messages", checkIsValidId, sendMessage);


export default chatRouter;
