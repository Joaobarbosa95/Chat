import { useEffect, useState } from "react";
import axios from "axios";

export default function useMessagesQuery(
  token,
  messagesLoaded,
  conversationId
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setMessages([]);
  }, [conversationId]);

  useEffect(() => {
    if (!token || conversationId.length < 1) return;

    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "POST",
      url: "http://localhost:4000/inbox/messages",
      data: {
        conversationId: String(conversationId),
        messagesLoaded: messagesLoaded,
      },
      headers: {
        authorization: "Bearer " + token,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setMessages((prevMessages) => {
          return [...prevMessages, ...res.data];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setLoading(false);
        setError(true);
      });
    return () => cancel();
  }, [token, messagesLoaded, conversationId]);

  return { loading, error, messages, hasMore };
}
