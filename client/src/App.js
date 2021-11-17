import "./index.css";
import LeftMenu from "./components/LeftMenu/LeftMenu.js";
import { UserProvider } from "./components/Contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="app">
        <LeftMenu />
      </div>
    </UserProvider>
  );
}

export default App;
