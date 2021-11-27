import { useReducer } from "react";
// importar object para chamar nos dispatchs
const ACTION_TYPE = {
  GET_USERS: "get-users",
  NEW_USER: "new-user",
  USER_DISCONNECT: "user-disconnect",
};

const initialState = [];
const reducer = function (state, action) {
  switch (action.type) {
    case ACTION_TYPE.GET_USERS:
      return action.onlineUsers;

    case ACTION_TYPE.NEW_USER:
      return [...state, action.user];

    case ACTION_TYPE.USER_DISCONNECT:
      return state.filter((user) => user.name !== action.user.name);

    default:
      return state;
  }
};

export default function useOnlineUsersReducer() {
  const [onlineUsers, dispatch] = useReducer(reducer, initialState);

  return { onlineUsers, dispatch };
}
