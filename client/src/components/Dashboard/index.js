import { socketInit } from "../../utils/socketConnection";

import ioClient from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const Dashboard = () => {
  return (
    <div>
      <button
        onClick={() => {
          const socket = ioClient(ENDPOINT);
          socket.auth = { username: "lequinhas" };
        }}
      >
        Clicka
      </button>
    </div>
  );
};

export default Dashboard;
