import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../Contexts/UserContext";

export default function useMessagesQuery(
  token,
  messagesLoaded,
  conversationId
) {
  const { user } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setMessages([]);
  }, [conversationId]);

  // Socket listeners
  useEffect(() => {
    user.socket.on("private message", ({ newMessage }) => {
      setMessages((prevMessages) => {
        return [...prevMessages, newMessage];
      });
    });

    return () => {
      user.socket.off("private message");
    };
  });

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
        res.data.reverse();
        setMessages((prevMessages) => {
          return [...res.data, ...prevMessages];
        });
        setHasMore(!(res.data.length < 20));
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
