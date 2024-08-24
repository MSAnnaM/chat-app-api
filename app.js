import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import { Server as SocketIO } from "socket.io"; 
// import socketMiddleware from "./midellwares/socketMiddleware.js";
import chatRouter from "./routes/chatRoutes.js";


const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/chats", chatRouter);


app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;