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
- Real-time chat with other users: you can send messages to other users and see their messages in real-time and delete your **own** messages

## Limitations

- Simple authentication: no email verification, no password recovery, no password reset, no password strength requirements and no password hashing
- In-memory storage: the app uses an in-memory storage for the users and messages, so the data is lost when the server is restarted
- Other features could have been added like chat rooms, message editing or typing indicators

## Technical details

### Tech used

- a React frontend with Next.js using TailwindCSS and shadcn/ui
- a Express.js backend
- Socket.io for real-time message communication
