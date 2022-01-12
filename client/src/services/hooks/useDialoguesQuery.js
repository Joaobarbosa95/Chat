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

  // When a new conversation is added
  useEffect(() => {
    const { socket } = user;

    if (!socket) return;
    socket.on("new dialogue", ({ userOne, userTwo, id }) => {
      setDialogues((prevDialogues) => {
        return [
          {
            userOne: userOne,
            userTwo: userTwo,
            conversationId: id,
            message: {},
          },
          ...prevDialogues,
        ];
      });
    });

    socket.on("private message", ({ newMessage }) => {
      console.log(newMessage);
    });

    return () => {
      socket.off("new dialogue");
    };
  });

  useEffect(() => {
    const { socket } = user;
    if (!socket) return;

    socket.on("new dialogue", () => {});

    socket.on("private message", (message) => {});
  });

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
        if (res.data.length === 0) return setLoading(false);

        const { userOne, userTwo, conversationId } = res.data[0];

        setUsername(user.username === userOne ? userTwo : userOne);
        setActiveDialogue(conversationId);

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
