# CS Chat App - Simple Full-Stack Chat App - Part of the CentraleSupélec Application Architecture Course

## Authors

- Eric Nguyen
- Charles Perier
- Paul Rousseau

## How to access the app

- The frontend is hosted on Vercel at [https://cs-chat-app.vercel.app/](https://cs-chat-app.vercel.app)
- The backend is hosted on Render at [https://cs-chat-app-backend.onrender.com/](https://cs-chat-app-backend.onrender.com)

You can also run the app locally by running `npm run dev` in the `frontend` and `backend` directories.

## Features

- Authentication with a username and a password (no email verification): you can create an account (with a unique username), log in and log out
- Real-time chat with other users: you can send messages to other users and see their messages in real-time and delete your **own** messages (by right-clicking on them)

## Limitations

- Simple authentication: no email verification, no password recovery, no password strength requirements and no password hashing
- In-memory storage: the app uses an in-memory storage for the users and messages, so the data is lost when the server is restarted
- Other features could have been added like chat rooms, message editing or typing indicators

## Technical details

### Tech used

- a [React](https://react.dev/) frontend with [Next.js](https://nextjs.org/) using [TailwindCSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com)
- an [Express.js](https://expressjs.com) backend
- the [Socket.IO](https://socket.io/) library for real-time message communication using websockets

### Implementation details

- The server stores the users and messages in in-memory variables.
- The frontend and the backend communicate through HTTP requests and websockets.
- There are two REST API endpoints on the backend:
  - `/signup` (POST) to create a new user, with a username and a password. This creates a new user in the in-memory storage and sends a JWT token to the client
  - `/login` (POST) to log in a user, with a username and a password. The server sends a JWT token to the client if the credentials are correct
- The rest of the communications are done through websockets using the `Socket.IO` library.
  - The frontend uses the JWT token to authenticate the user during the websocket handshake. If the token is valid, the connection is accepted and the user can send and receive messages
  - The clients can emit two types of events to the server:
    - `sendMessage` to send a new message to the server
    - `deleteMessage` to delete a message from the server
  - The server can emit two types of events to the clients, that result from the two types of events above:
    - `newMessages` to send a list of new messages to all the clients, that will be added to the client-side chat
    - `deletedMessage` to send the id of a deleted message to all the clients, that will be removed from the client-side chat
- There are three pages on the frontend:
  - the login page, where the user can log in (page to which the user is redirected to when he is not logged in)
  - the signup page, where the user can create an account
  - the chat page, where the user can chat with other users (page to which the user is redirected to when he is logged in)
