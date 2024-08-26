import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import session from "express-session";
import "./helpers/passport.js";
import authRoutes from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: 'chat-app-api-production-8dc6.up.railway.app', 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 24 * 60 * 60 * 1000, 
      sameSite: 'none', 
      // httpOnly: true, 
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(authRoutes);
app.use("/api/chats", chatRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
