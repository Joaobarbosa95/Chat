import React, { useEffect, useState, memo } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../../../Contexts/UserContext";
import { useChatContext } from "../../../../Contexts/ChatContext";
import { updateUnseeMessages } from "../../../../services/api/user";

import formatDate from "../../../../utils/formatDate";
import axios from "axios";

const DialogueItem = ({ dialogue }) => {
  const { userState } = useUserContext();
  const { socket } = userState;

  const { userOne, userTwo, conversationId, text, last_updated } = dialogue;

  const { setActiveDialogue, setUsername, activeDialogue, onlineUsers } =
    useChatContext();
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageTime, setLastMessageTime] = useState("");
  const [unseenMessages, setUnseenMessages] = useState(0);
  const [status, setStatus] = useState("offline");

  const otherUser = userState.username === userOne ? userTwo : userOne;

  // New message handler
  useEffect(() => {
    if (!text) return;
    setLastMessage(text);
    setLastMessageTime(formatDate(last_updated));
    activeDialogue === conversationId
      ? setUnseenMessages(0)
      : setUnseenMessages(unseenMessages + 1);
  }, [text, last_updated]);

  // Socket
  useEffect(() => {
    const userFound = onlineUsers.find((user) => user.username === otherUser);
    if (userFound) setStatus("online");

    socket.on("user connected", ({ username }) => {
      if (otherUser === username) setStatus("online");
    });

    socket.on("user disconnected", ({ username }) => {
      if (otherUser === username) setStatus("offline");
    });

    return () => {
      socket.off("user connected");
      socket.off("user disconnected");
    };
  }, [socket, onlineUsers]);

  // Fetch last message
  useEffect(() => {
    if (!conversationId) return;
    if (lastMessage.length > 1) return;

    let cancelQuery;
    const token = "Bearer " + userState.token;

    axios({
      method: "POST",
      url: "http://localhost:4000/inbox/last-message",
      data: { conversationId: conversationId },
      cancelToken: new axios.CancelToken((c) => (cancelQuery = c)),
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        const { unseenCount } = res.data;
        const { text, timestamp } = res.data.lastMessage;

        setLastMessage(text);

        conversationId === activeDialogue
          ? setUnseenMessages(0)
          : setUnseenMessages(unseenCount);

        const time = formatDate(timestamp);
        setLastMessageTime(time);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    return () => cancelQuery();
  });

  return (
    <div
      className="dialogue-item"
      onClick={(e) => {
        setActiveDialogue(dialogue.conversationId);
        setUsername(otherUser);
        updateUnseeMessages(userState.token, dialogue.conversationId);
        setUnseenMessages(0);
      }}
    >
      {dialogue.avatar ? (
        <img src={dialogue.avatar} alt="avatar" className="avatar" />
      ) : (
        <FaUserCircle className="avatar" />
      )}
      <div className="dialogue-info">
        <div className="dialogue-name">{otherUser}</div>
        <div className="last-message-time">{lastMessageTime}</div>
        <div className="dialogue-status">{status}</div>
      </div>
      <div className="dialogue-text">
        <div className="dialogue-last-message">{lastMessage}</div>
        {unseenMessages > 0 && (
          <div className="unseen-messages-count">{unseenMessages}</div>
        )}
      </div>
    </div>
  );
};

export default memo(DialogueItem);
