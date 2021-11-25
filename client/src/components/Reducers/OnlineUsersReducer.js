import { useReducer } from "react";

const initialState = [];
const reducer = function (state, action) {
  if (action.type === "user-connected") {
    state.push(action.payload);
  }
  if (action.type === "user-disconnected") {
    state.filter((user) => user.username !== action.payload.username);
  }
};

export default function useOnlineUsersReducer() {
  const [onlineUsers, dispatch] = useReducer(reducer, initialState);

  return { onlineUsers, dispatch };
}
