import React, { useEffect, useState, memo } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../Contexts/UserContext";
import { useChatContext } from "../../Contexts/ChatContext";
import { updateUnseeMessages } from "../../../services/api/user";

import formatDate from "../../../utils/formatDate";
import axios from "axios";

const DialogueItem = ({ dialogue, reference }) => {
  const { user } = useUserContext();
  const {
    userOne,
    userTwo,
    conversationId,
    text,
    timestamp,
    unseenMessagesCount,
  } = dialogue;

  const { setActiveDialogue, setUsername, activeDialogue } = useChatContext();
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageTime, setLastMessageTime] = useState("");
  const [unseenMessages, setUnseenMessages] = useState(0);

  // if (text && timestamp) {
  //   setLastMessage(text);
  //   setLastMessageTime(timestamp);
  // }

  useEffect(() => {
    if (!conversationId) return;
    if (lastMessage.length > 1) return;

    let cancelQuery;
    const token = "Bearer " + user.token;

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
  }, []);

  const otherUser = user.username === userOne ? userTwo : userOne;

  return (
    <div
      className="dialogue-item"
      onClick={(e) => {
        setActiveDialogue(dialogue.conversationId);
        setUsername(otherUser);
        updateUnseeMessages(user.token, dialogue.conversationId);
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
        <div className="dialogue-status">
          {dialogue?.status ? "online" : "offline"}
        </div>
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
