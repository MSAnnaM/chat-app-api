import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    messages: [{ text: String, sender: String, timestamp: Date }],
  },
  { versionKey: false }
);

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
