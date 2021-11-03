import React from "react";
import PropTypes from "prop-types";
import { FaTelegramPlane } from "react-icons/fa";

const GlobalChat = (props) => {
  return (
    <div className="chat-container">
      <div className="chat-title">
        <p>Global Chat</p>
        <p>You are logged as Visitor</p>
      </div>
      <div className="chat-messages-container">
        <div className="chat-messages">
          <div className="message-container">
            <div className="message">
              Hello World
              <br></br>
              Toma
            </div>
            <div className="message-date">Wednesday 12:33:22</div>
          </div>
          <div className="message-container">
            <div className="message">
              Hello World
              <br></br>
              Toma
            </div>
            <div className="message-date">Wednesday 12:33:22</div>
          </div>
        </div>
      </div>
      <div className="chat-input-form">
        <form className="chat-form">
          <textarea className="chat-input" placeholder="Insert text"></textarea>
          <div className="chat-send">
            <button
              type="submit"
              className="chat-send-btn"
              onClick={(e) => e.preventDefault()}
            >
              <FaTelegramPlane style={{ fontSize: "2em" }} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

GlobalChat.propTypes = {};

export default GlobalChat;
