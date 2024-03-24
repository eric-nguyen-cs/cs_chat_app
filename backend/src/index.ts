import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createServer } from "http";
import { Server } from "socket.io";
import type {
  Message,
  UserWithPassword,
  ServerToClientEvents,
  ClientToServerEvents,
  DecodedToken,
} from "./types";

// Secret key used to sign JWT tokens
const secretKey = "verySecretKey";

const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

let currentMessageId = 1;
const messages: Message[] = [];
const users: UserWithPassword[] = [];

const createToken = (username: string) => {
  return jwt.sign({ username }, secretKey, { expiresIn: "2h" });
};

app.post("/signup", (req, res) => {
  const newUser: UserWithPassword = req.body;
  const existingUser = users.find((u) => u.username === newUser.username);
  if (existingUser) {
    return res.status(400).send("Username already exists");
  }
  users.push(newUser);
  const token = createToken(newUser.username);
  res.send({ username: newUser.username, token });
});

app.post("/login", (req, res) => {
  const { username, password }: UserWithPassword = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = createToken(username);
    res.json({ username, token });
  } else {
    res.status(400).send("Invalid username or password");
  }
});

io.on("connection", (socket) => {
  const token = socket.handshake.auth.token as string;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey) as DecodedToken;
      socket.handshake.auth.username = decoded.username;
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      socket.disconnect();
    }
  } else {
    console.error("No JWT token provided");
    socket.disconnect();
  }

  if (messages.length > 0) {
    socket.emit("newMessages", messages);
  }

  socket.on("sendMessage", (content: string) => {
    const message: Message = {
      id: currentMessageId++,
      username: socket.handshake.auth.username,
      content,
      writtenAt: Date.now(),
    };
    messages.push(message);
    io.emit("newMessages", [message]);
  });

  socket.on("deleteMessage", (id: number) => {
    const index = messages.findIndex((m) => m.id === id);
    if (index !== -1) {
      if (messages[index].username !== socket.handshake.auth.username) {
        return;
      }
      messages.splice(index, 1);
      io.emit("deletedMessage", id);
    }
  });
});

const port = 8000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export { app, io };
