import "./index.css";
import LeftMenu from "./components/LeftMenu/LeftMenu.js";
import { ChatProvider } from "./components/Contexts/ChatContext";
import { RequireAuth } from "./components/Contexts/AuthContext";
import { OnlineUsersProvider } from "./components/Contexts/OnlineUsersContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";
import User from "./components/User";
import Inbox from "./components/Inbox";

function App() {
  return (
    <ChatProvider>
      <OnlineUsersProvider>
        <Router>
          <div className="app">
            <LeftMenu />
            <div className="main-content">
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="users" element={<Users />} />
                <Route
                  path="user"
                  element={
                    <RequireAuth>
                      <User />
                    </RequireAuth>
                  }
                />
                <Route
                  path="inbox"
                  element={
                    <RequireAuth>
                      <Inbox />
                    </RequireAuth>
                  }
                />
              </Routes>
            </div>
          </div>
        </Router>
      </OnlineUsersProvider>
    </ChatProvider>
  );
}

export default App;
