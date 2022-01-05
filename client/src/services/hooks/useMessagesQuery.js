import axios from "axios";
import { useState, useEffect } from "react";

export default useMessagesQuery = (messagesPage, conversationId) => {
  // Each message page = 10 new messages. Ex: page 0 = 10, page 1 = 10 after
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setMessages([]);
  }, conversationId);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;

    axios({
      method: "GET",
      url: "http://localhost:4000/conversation",
      params: { conversationId: conversationId },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res);
        // setMessage()

        setHasMore(res.data.length > 9);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(e);
      });

    return () => cancel();
  }, [messagesPage, conversationId]);

  return { messages, loading, error, hasMore };
};
