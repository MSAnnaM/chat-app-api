import express from "express";
import { deleteChat, getAllChats, newChatController, sendMessage, updateChat } from "../controllers/chatControllers.js";
import { checkIsValidId } from "../midellwares/isValidId.js";

const chatRouter = express.Router();
chatRouter.post('/create', newChatController);
chatRouter.get("/", getAllChats);
chatRouter.patch("/:chatId", checkIsValidId, updateChat);
chatRouter.delete("/:chatId", checkIsValidId, deleteChat);
chatRouter.post("/:chatId/messages", checkIsValidId, sendMessage);


export default chatRouter;
