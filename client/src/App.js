import "./index.css";
import LeftMenu from "./components/LeftMenu/LeftMenu.js";
import { UserProvider } from "./components/Contexts/UserContext";
import { ChatProvider } from "./components/Contexts/ChatContext";
import { OnlineUsersProvider } from "./components/Contexts/OnlineUsersContext";

function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <OnlineUsersProvider>
          <div className="app">
            <LeftMenu />
          </div>
        </OnlineUsersProvider>
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
