import fetch from "node-fetch";
import Chat from "../db/models/chatModel.js";
import HttpError from "../helpers/HttpError.js";

export const newChatController = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const existingChat = await Chat.findOne({ firstName });
    if (existingChat) {
      throw HttpError(409, "Chat already exists");
    }

    const newChat = await Chat.create({ firstName, lastName, messages: [] });

    res.status(201).json(newChat);
  } catch (er) {
    next(er);
  }
};

export const getAllChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({});
    res.status(200).json(chats);
  } catch (er) {
    next(er);
    console.error(er);
  }
};

export const updateChat = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const { chatId } = req.params;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { firstName, lastName },
      { new: true }
    );
    if (!updateChat) {
      throw HttpError(404, "Chat not found");
    }

    res.status(200).json(updatedChat);
  } catch (er) {
    next(er);
  }
};

export const deleteChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const deletedChat = await Chat.findByIdAndDelete(chatId);
    if (!deletedChat) {
      throw HttpError(404, "Chat not found");
    }

    res.status(200).json({ message: "Chat deleted" });
  } catch (er) {
    next(er);
    console.error(er);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, sender } = req.body;
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw HttpError(404, "Chat not found");
    }

    const newMessage = { text, sender, timestamp: new Date() };
    chat.messages.push(newMessage);
    await chat.save();

    res.status(201).json({ message: "Message sent", chat });

    setTimeout(async () => {
      try {
        const response = await fetch("https://your-energy.b.goit.study/api/quote");
          const quote = await response.json();
          console.log(quote);
          
        const autoMessage = {
          text: quote.quote,
          sender: "Bot",
          timestamp: new Date(),
        };

          chat.messages.push(autoMessage);
          console.log(autoMessage);
          
        await chat.save();
        req.io.emit('newMessage', autoMessage);
      } catch (er) {
        console.error("Error fetching quote:", er);
      }
    }, 3000);
  } catch (er) {
    next(er);
    console.error("Error sending message:", er);
  }
};
