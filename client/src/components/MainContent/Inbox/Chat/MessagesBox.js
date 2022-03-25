import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { useUserContext } from "../../../../Contexts/UserContext";
import { useChatContext } from "../../../../Contexts/ChatContext";
import useMessagesQuery from "../../../../services/hooks/useMessagesQuery";
import Message from "./Message";

const MessagesBox = () => {
  const { userState } = useUserContext();
  const { activeDialogue } = useChatContext();
  const [messagesLoaded, setMessagesLoaded] = useState(0);

  let { loading, error, hasMore, messages } = useMessagesQuery(
    userState.token,
    messagesLoaded,
    activeDialogue
  );

  const firstMessagesRenderRef = useRef(0);

  useEffect(() => {
    setMessagesLoaded(0);
    firstMessagesRenderRef.current = 0;
  }, [activeDialogue]);

  // Scroll to new message
  const scrollToBottom = (element) => {
    element.scrollIntoView({
      behavior: "auto",
    });
  };
  const observerMessageBottom = useRef(null);

  useEffect(() => {
    if (lastMessage.current.scrollTopMax - lastMessage.current.scrollTop < 100)
      scrollToBottom(observerMessageBottom.current);
  }, [messages]);

  // Infinite Scrolling Top
  const observer = useRef();
  const infiniteScrollElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (firstMessagesRenderRef.current > 1)
            lastMessage.current.scrollTop = 1;
          setMessagesLoaded(messages.length - 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [activeDialogue, loading, hasMore]
  );

  // Start Scroll bottom
  const lastMessage = useRef();

  const startScrollBottom = () => {
    lastMessage.current.scrollTop = lastMessage.current.scrollHeight;
  };

  useEffect(() => {
    if (firstMessagesRenderRef.current > 2) return;
    firstMessagesRenderRef.current = firstMessagesRenderRef.current + 1;
    startScrollBottom();
  }, [messages, activeDialogue]);

  return (
    <div className="messages-box" ref={lastMessage}>
      {loading && "Loading..."}
      {error && "An error has occured"}
      {messages.map((message, index) => {
        if (index === 0) {
          return (
            <Message
              message={message}
              key={message._id}
              reference={infiniteScrollElementRef}
            />
          );
        }
        return <Message message={message} key={message._id} />;
      })}
      <div style={{ width: "100%" }} ref={observerMessageBottom}></div>
    </div>
  );
};

export default memo(MessagesBox);
