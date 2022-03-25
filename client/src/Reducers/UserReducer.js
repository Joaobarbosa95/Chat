import { useReducer } from "react";

const ACTION_TYPE = {
  USER_CREATE_ACCOUNT: "create account",
  USER_LOGIN: "user login",
  USER_LOGOUT: "user disconnect",
};

const initialState = {
  username: null,
  stayConnected: false,
  socket: null,
  accountType: "Temporary",
  token: null,
};

const reducer = function (state, action) {
  switch (action.type) {
    case ACTION_TYPE.USER_CREATE_ACCOUNT:
      return { ...state, ...action.payload };
    case ACTION_TYPE.USER_LOGIN:
      return { ...state, ...action.payload };

    case ACTION_TYPE.USER_LOGOUT:
      return initialState;
  }
};

export default function useUsersReducer() {
  const [userState, userDispatch] = useReducer(reducer, initialState);

  return { userState, userDispatch };
}
