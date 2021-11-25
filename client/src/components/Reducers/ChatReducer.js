import { useReducer } from "react";

const initialState = [];
const reducer = function (state, action) {
  if (action.type === "new-message") {
    state.push(action.payload);
  }
};

export default function useChatReducer() {
  const [messages, dispatch] = useReducer(reducer, initialState);

  return { messages, dispatch };
}
