import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../Contexts/UserContext";
import { useChatContext } from "../../Contexts/ChatContext";

import formatDate from "../../../utils/formatDate";
import axios from "axios";

const DialogueItem = ({ dialogue, reference }) => {
  const { user } = useUserContext();
  const { userOne, userTwo, conversationId } = dialogue;

  const { setActiveDialogue, setUsername } = useChatContext();
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageTime, setLastMessageTime] = useState("");
  const [unseenMessages, setUnseenMessages] = useState(0);

  useEffect(() => {
    let cancelQuery;
    const token = "Bearer " + user.token;

    if (!conversationId) return;
    if (lastMessage.length > 1) return;

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
        setUnseenMessages(unseenCount);
        const time = formatDate(timestamp);
        setLastMessageTime(time);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    return () => cancelQuery();
  }, []);

  const otherUser = user.username === userOne ? userTwo : userOne;

  return (
    <div
      className="dialogue-item"
      onClick={(e) => {
        setActiveDialogue(conversationId);
        setUsername(otherUser);
      }}
      ref={reference}
    >
      {dialogue.avatar ? (
        <img src={dialogue.avatar} alt="avatar" className="avatar" />
      ) : (
        <FaUserCircle className="avatar" />
      )}
      <div className="dialogue-info">
        <div className="dialogue-name">{otherUser}</div>
        <div className="last-message-time">{lastMessageTime}</div>
        <div className="dialogue-status">
          {dialogue?.status ? "online" : "offline"}
        </div>
      </div>
      <div className="dialogue-text">
        <div className="dialogue-last-message">{lastMessage}</div>
        <div className="unseen-messages-count">{unseenMessages}</div>
      </div>
    </div>
  );
};

export default DialogueItem;
