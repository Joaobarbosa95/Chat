# Chat

This app is a simple chat made as an individual project. It can be used in two ways, deppending on whether you're logged or not.

Logged users have access to both chats: individual and global/public. For a simple user experience (not logged), select the global chat tab (user group icon) and insert a username in the input field. This will give you the ability to talk publicly with logged and not logged users.

## How it works

Opening the chat for the first time will lead to two outcomes:

1. A login screen will be rendered (index route) or you'll be redirect to the login screen if your route is protected
   (Screen shot)

2. The global/public chat will be displayed for you to join
   (screen shot)

### Account creation

The account creation (located next to the login tab, in the login screen) will give you access to a permanent account and a public profile, both saved permanently in the databases.

As soon as your account is created, a logged session is iniciated.

### Logged Session

As soon as you log in, a token and a sessionID will be sent to the browser and saved. This will validate the socket connection created, and access to both individual and public chat (automatically).

#### Individual chat

The individual chat (inbox icon), gives the user access to private messaging, as well as a component with the public information about the person contacted./

(screen shot with some arrows points and numbering the fields to explain below)

- Search field: search the rendered messages by name
- Add conversation: displays a box with a search field to find users to talk
- Message order: sorts the messages
- Chat
- Public profile: displays the user you're messaging public profile

## Running your own Chat

### Folder Structure

The application in divided into client and server folders.

#### Components

The components folder has tree structure as follows:

```bash
Components
├───LeftMenu
└───MainContent
    ├───Dashboard
    ├───Home
    ├───Inbox
    │   ├───AboutUser
    │   ├───Chat
    │   └───Dialogues
    ├───User
    └───Users
        ├───GlobalChat
        │   ├───Chat
        │   ├───ChatHeader
        │   └───Message
        └───OnlineUsers
            ├───Title
            └───User
```

The LeftMenu component is the "commander". The the active tab will render the component with the same name (component inside the MainContent folder).

#### contexts

There are 4 context files:

1. Auth context: Routes access control
2. ChatContext: sets which individual chat is rendered and the information necessary to communicate
3. UserContext: User object control (account type, token, socket, username)
4. OnlineUsersContext: Global Chat State control

#### utils

General helpful functions put in this folder to simplify code readability. Include functions like socketConnection (to initiate socket connections), functions to format dates or some CRUD operations (server folder).

#### services

Services include the api calls in the api folder and some custom hooks.

### Env variables

#### Client

Client has no environment variables, but has a axios config variable (baseURL) which can be change in _*/client/src/services/api/axiosInstance.js*_ and the socket connection endpoint, located at _**//client/src/utils/socketConnection.js**_

#### Server

The environment variables are the ones shown below:

```env
PORT=4000                                       # Server running port
DATABASE_URL=mongodb://localhost:27017/Chat     # mongoDB database URL
JWT_SECRET=SUPER_MARIO                          # JWT token secret (a 64bit randomly generated string is recommended)
```

### Run application locally

You´ll need 3 separate CLI windows to run the client, server and database simultaneously.

### Client

To start the client locally (from root folder):

```bash
cd client && npm start
```

### Server

To start the server locally (from root folder):

```bash
cd server && npm start
```

### Database

The database runs on MongoDB. To start an instance run the following command:

```bash
mongod --dbpath "<database folder path>"
```

Note:\
You´ll need to have "mongod.exe" on your PATH env.

## Future development

### Main objectives

The primary intent of this app was to make a solo project to learn React.js, Socket.io and gain experience in web app development architecture.
It is an ongoing project, where funcionalities will be added, changed or completetly re-worked to fit a better UI/UX and code maintainability.

### Current state

Currently refactoring the code and cleaning it up for future maintainability.

### Future features

The next features that will be added will be: a dashboard menu, a public profile edit menu and application tests.

## Code usage and Suggestions

The code is free to fork, use and modify as you please.

If you'd like to see some specific feature added or simply give an opinion, feedback and suggestions are more than welcome.
