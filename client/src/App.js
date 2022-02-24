import "./index.css";
import LeftMenu from "./Components/LeftMenu/LeftMenu.js";
import { ChatProvider } from "./Contexts/ChatContext";
import { RequireAuth } from "./Contexts/AuthContext";
import { OnlineUsersProvider } from "./Contexts/OnlineUsersContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Components/MainContent/Users";
import Home from "./Components/MainContent/Home";
import User from "./Components/MainContent/User";
import Inbox from "./Components/MainContent/Inbox";
import Dashboard from "./Components/MainContent/Dashboard";

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
                <Route path="send" element={<Dashboard />} />
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
