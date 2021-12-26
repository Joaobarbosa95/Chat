import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../Contexts/UserContext";

const DialogueItem = ({ dialogue, setActiveDialogue }) => {
  const { user } = useUserContext();
  const { userOne, userTwo, messages } = dialogue;

  let unseenMessages = 0;
  const length = messages.length - 1;

  // unseenMessages count
  for (let i = length; i > 0; i--) {
    if (messages[i].seen === false && length > 0) unseenMessages++;
    break;
  }

  // in hours
  let lastMessageTime =
    length > 0 &&
    new Date().getTime() - new Date(messages[length]?.timestamp).getTime();

  // Dirty solution
  if (!lastMessageTime) {
    lastMessageTime = "";
  } else if (lastMessageTime < 60000) {
    lastMessageTime = "1 min";
  } else if (lastMessageTime < 3600000) {
    lastMessageTime = parseInt(lastMessageTime / 1000 / 60) + "min";
  } else if (lastMessageTime < 86400000) {
    lastMessageTime = parseInt(lastMessageTime / 1000 / 60 / 24) + "h";
  } else if (lastMessageTime < 604800000) {
    lastMessageTime = parseInt(lastMessageTime / 1000 / 60 / 24 / 7) + "d";
  } else {
    lastMessageTime = parseInt(lastMessageTime / 1000 / 60 / 24 / 7 / 52) + "w";
  }

  return (
    <div
      className="dialogue-item"
      onClick={(e) => setActiveDialogue(dialogue._id)}
    >
      {dialogue.avatar ? (
        <img src={dialogue.avatar} alt="avatar" className="avatar" />
      ) : (
        <FaUserCircle className="avatar" />
      )}
      <div className="dialogue-info">
        <div className="dialogue-name">
          {user.username === userOne ? userTwo : userOne}
        </div>
        <div className="last-message-time">{lastMessageTime}</div>
        <div className="dialogue-status">{dialogue.status}</div>
      </div>
      <div className="dialogue-text">
        <div className="dialogue-last-message">{messages[length]?.text}</div>
        <div className="unseen-messages-count">{unseenMessages}</div>
      </div>
    </div>
  );
};

export default DialogueItem;
