import "./index.css";
import { useState, useEffect } from "react";
import LeftMenu from "./components/LeftMenu/LeftMenu.js";
import { UserProvider } from "./components/Contexts/UserContext";
import { ChatProvider } from "./components/Contexts/ChatContext";
import { OnlineUsersProvider } from "./components/Contexts/OnlineUsersContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useHref,
} from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";
import User from "./components/User";
import Inbox from "./components/Inbox";

function App() {
  // <Router path="*" element={<Users />} />
  // <Route path="/" element={<Home />} />
  // <Route path="/profile/:id" element={<Profile />} />
  // <Route path="/inbox" element={<Inbox />} />
  // <Route path="/send" element={<Send />} />
  // <Route path="/users" element={<Users />} />
  // <Route path="/notifications" element={<Notifications />} />
  // <Route path="/options" element={<Options />} />
  // const navigate = useNavigation();
  // navigate("/home");
  // const { id } = useParams();

  // const token = localStorage.getItem("ChatToken");
  // const username = localStorate.getItem("ChatUsername");
  // user.token = token;
  // user.username = username;

  return (
    <UserProvider>
      <ChatProvider>
        <OnlineUsersProvider>
          <Router>
            <div className="app">
              <LeftMenu />
              <div className="main-content">
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="users" element={<Users />} />
                  <Route path="user" element={<User />} />
                  <Route path="inbox" element={<Inbox />} />
                </Routes>
              </div>
            </div>
          </Router>
        </OnlineUsersProvider>
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
