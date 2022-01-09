import React, { useEffect, useState, useRef, useCallback } from "react";
import { useUserContext } from "../../Contexts/UserContext";
import { useChatContext } from "../../Contexts/ChatContext";
import useMessagesQuery from "../../../services/hooks/useMessagesQuery";
import Message from "./Message";

const MessagesBox = () => {
  const { user } = useUserContext();
  const { activeDialogue } = useChatContext();
  const [messagesLoaded, setMessagesLoaded] = useState(0);

  const { loading, error, hasMore, messages } = useMessagesQuery(
    user.token,
    messagesLoaded,
    activeDialogue
  );

  useEffect(() => {
    setMessagesLoaded(0);
  }, [activeDialogue]);

  // Smooth Scrolling
  const messagesBottom = useRef(null);

  const scrollToBottom = () => {
    messagesBottom.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Only when a new message is received -- will trigger when user is scrolling top also
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Infinite Scrolling
  const observer = useRef();
  const lastMessageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setMessagesLoaded(messages.length - 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [activeDialogue, loading, hasMore]
  );

  return (
    <div className="messages-box">
      {loading && "Loading..."}
      {error && "An error has occured"}
      {messages.map((message, index) => {
        if (messages.length === index + 1)
          return (
            <Message
              message={message}
              key={message._id}
              reference={lastMessageElementRef}
            />
          );

        return <Message message={message} key={message._id} />;
      })}
      <div ref={messagesBottom} style={{ width: "100%" }} />
    </div>
  );
};

export default MessagesBox;
