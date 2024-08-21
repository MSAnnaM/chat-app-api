import app from "./app.js";
import connectMongo from "./db/connectMongo.js";
import http from "http"; 
import { Server as SocketIO } from "socket.io"; 
import socketMiddleware from "./midellwares/socketMiddleware.js";

const { PORT } = process.env;

const startServer = async () => {
  try {

      await connectMongo();
      
      const server = http.createServer(app);
      
    const io = new SocketIO(server, {
      cors: {
            origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
    app.use(socketMiddleware(io));

    server.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });

  } catch (err) {
    console.log(err);
  }
};

startServer();
