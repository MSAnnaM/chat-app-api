import Chat from "../db/models/chatModel.js";

const getRandomChatId = async () => {
    try {
        const chats = await Chat.find({});
        console.log(chats);
        
    }
    catch (er) {
        console.log(er);
        
    }
}


const randomMessage = () => {
    setInterval(() => {
    const randomChatId = getRandomChatId(); // Реалізуйте функцію, яка повертає випадковий ID чату
    const message = { text: "Automated message", sender: "System", timestamp: new Date() };
    io.emit("newMessage", { chatId: randomChatId, message });
  }, 30000);
}

export default randomMessage;