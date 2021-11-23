import React from "react";

const ChatHeaderSignIn = ({ setPayload }) => {
  return (
    <div className="chat-title">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setPayload({
            username: e.target[0].value,
            stayConnected: e.target[1].checked,
          });
        }}
      >
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" />
        <label htmlFor="stayConnected">Stay Connected: </label>
        <input type="checkbox" name="stayConnected" />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default ChatHeaderSignIn;
