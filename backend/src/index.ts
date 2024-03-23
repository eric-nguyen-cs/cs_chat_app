import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createServer } from "http";
import { Server } from "socket.io";
import type { Message, User, UserWithPassword } from "./types";

interface ServerToClientEvents {
  newMessages: (messages: Message[]) => void;
  deletedMessage: (id: number) => void;
}

interface ClientToServerEvents {
  sendMessage: (content: string) => void;
  deleteMessage: (id: number) => void;
}

interface DecodedToken {
  username: string;
}

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

app.post("/signup", (req, res) => {
  const newUser: UserWithPassword = req.body;
  // Check if the username already exists
  const existingUser = users.find((u) => u.username === newUser.username);
  if (existingUser) {
    return res.status(400).send("Username already exists");
  }
  // Add user to the users array (in a real application, you'd likely hash the password before storing it)
  users.push(newUser);
  res.send({ username: newUser.username } as User);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Check if the user exists in the users array (in a real application, you'd verify the password hash)
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    // Create a JWT token with the user's username as the payload
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "2h",
    });
    // Send the JWT token to the user in the response
    res.json({ username, token });
  } else {
    res.status(400).send("Invalid username or password");
  }
});

io.on("connection", (socket) => {
  console.log("New user connected!");

  // Verify JWT token sent by the client
  const token = socket.handshake.auth.token as string;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey) as DecodedToken;
      console.log("User authenticated:", decoded.username);
      // Add the authenticated user to the socket object for later use
      socket.handshake.auth.username = decoded.username;
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      socket.disconnect();
    }
  } else {
    console.error("No JWT token provided");
    socket.disconnect();
  }

  // Emit existing messages to the newly connected client
  if (messages.length > 0) {
    socket.emit("newMessages", messages);
  }

  // Listen for new messages from clients
  socket.on("sendMessage", (content: string) => {
    const message: Message = {
      id: currentMessageId++,
      username: socket.handshake.auth.username,
      content,
      writtenAt: Date.now(),
    };
    messages.push(message);
    // Broadcast the new message to all connected clients
    io.emit("newMessages", [message]);
  });

  // Listen for deletion of messages from clients
  socket.on("deleteMessage", (id: number) => {
    const index = messages.findIndex((m) => m.id === id);
    if (index !== -1) {
      // Check if the user has written the message they want to delete
      if (messages[index].username !== socket.handshake.auth.username) {
        console.log(
          "User is not authorized to delete messages from other users"
        );
        return;
      }
      messages.splice(index, 1);
      // Broadcast the deleted message ID to all connected clients
      io.emit("deletedMessage", id);
    }
  });
});

const port = 8000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
