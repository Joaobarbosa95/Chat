import "./index.css";
import LeftMenu from "./components/LeftMenu/LeftMenu.js";
import { UserProvider } from "./components/Contexts/UserContext";
import { ChatProvider } from "./components/Contexts/ChatContext";
import { OnlineUsersProvider } from "./components/Contexts/OnlineUsersContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";

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
