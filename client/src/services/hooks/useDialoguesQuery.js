import { useEffect, useState } from "react";
import axios from "axios";
import { useChatContext } from "../../components/Contexts/ChatContext";
import { useUserContext } from "../../components/Contexts/UserContext";

export default function useDialoguesQuery(token, conversationsLoaded) {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogues, setDialogues] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { setActiveDialogue, setUsername } = useChatContext();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "POST",
      url: "http://localhost:4000/inbox/dialogues",
      data: { conversationsLoaded: conversationsLoaded },
      headers: {
        authorization: "Bearer " + token,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        if (dialogues.length === 0) {
          const { userOne, userTwo, conversationId } = res.data[0];
          setActiveDialogue(conversationId);

          const otherUser = user.username === userOne ? userTwo : userOne;
          setUsername(otherUser);
        }

        setDialogues((prevDialogues) => {
          return [...prevDialogues, ...res.data];
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
  }, [token, conversationsLoaded]);

  return { loading, error, dialogues, hasMore };
}
