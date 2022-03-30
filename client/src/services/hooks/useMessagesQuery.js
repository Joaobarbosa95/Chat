import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import axiosParent from "axios";
import { useUserContext } from "../../Contexts/UserContext";

const { CancelToken, isCancel } = axiosParent;

export default function useMessagesQuery(
  token,
  messagesLoaded,
  conversationId
) {
  const { userState } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setMessages([]);
  }, [conversationId]);

  // Socket listeners
  useEffect(() => {
    userState.socket.on("private message", ({ newMessage }) => {
      setMessages((prevMessages) => {
        return [...prevMessages, newMessage];
      });
    });

    return () => {
      userState.socket.off("private message");
    };
  });

  useEffect(() => {
    if (!token || conversationId?.length < 1) return;

    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "POST",
      url: "/inbox/messages",
      data: {
        conversationId: String(conversationId),
        messagesLoaded: messagesLoaded,
      },
      headers: {
        authorization: "Bearer " + token,
      },
      cancelToken: new CancelToken((c) => (cancel = c)),
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
        if (isCancel(e)) return;
        setLoading(false);
        setError(true);
      });
    return () => cancel();
  }, [token, messagesLoaded, conversationId]);

  return { loading, error, messages, hasMore };
}
