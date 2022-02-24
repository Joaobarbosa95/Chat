import { useEffect, useState } from "react";
import axios from "axios";
import { useChatContext } from "../../Contexts/ChatContext";
import { useUserContext } from "../../Contexts/UserContext";

export default function useDialoguesQuery(token, conversationsLoaded) {
  const { user } = useUserContext();
  const { socket } = user;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogues, setDialogues] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { setActiveDialogue, setUsername } = useChatContext();

  // When a new conversation is added
  useEffect(() => {
    if (!socket) return;
    socket.on("new dialogue", ({ userOne, userTwo, id }) => {
      setActiveDialogue(id);
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

    socket.on("private message 2", ({ newMessage }) => {
      const { sender, receiver, conversationId, text, timestamp } = newMessage;
      const lastDialogue = {
        userOne: sender,
        userTwo: receiver,
        conversationId: conversationId,
        text: text,
        last_updated: timestamp,
      };

      const conversations = dialogues.filter(
        (conversation) => conversation.conversationId !== conversationId
      );
      setDialogues([lastDialogue, ...conversations]);
    });

    return () => {
      socket.off("new dialogue");
      socket.off("private message 2");
    };
  }, [socket, token, dialogues]);

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
