import React, { useState, useEffect } from "react";
import "./inbox.css";

import Dialogues from "./dialogues/Dialogues";
import Chat from "./chat/Chat";
import AboutUser from "./aboutUser/AboutUser";
import { useUserContext } from "../Contexts/UserContext";

const Index = () => {
  const { user } = useUserContext();
  const { socket } = user;

  const [activeDialogue, setActiveDialogue] = useState();
  const [dialogues, setDialogues] = useState([]);
  const [publicProfile, setPublicProfile] = useState({});

  useEffect(() => {
    if (!socket) return;
    socket.on("new dialogue", ({ newConversation, activeDialogueId }) => {
      setDialogues((prevDialogues) => {
        const conversations = prevDialogues.filter(
          (conversation) => conversation._id !== activeDialogueId
        );

        setActiveDialogue(newConversation._id);
        return [newConversation, ...conversations];
      });
    });

    socket.on("private message", ({ dialogue }) => {
      setDialogues((prevDialogues) => {
        const conversations = prevDialogues.filter(
          (conversation) => conversation._id !== dialogue._id
        );

        return [dialogue, ...conversations];
      });
    });
    return () => {
      socket.off("new dialogue");
      socket.off("private message");
    };
  }, [socket]);

  useEffect(() => {
    if (dialogues.length === 0) return;
    socket.emit("users");

    socket.on("users", (users) => {
      setDialogues((prevDialogues) => {
        const newDialogues = prevDialogues.map((dialogue) => {
          const { userOne, userTwo } = dialogue;
          const socketUsername = userOne === user.username ? userTwo : userOne;

          const online = users.find(
            (socket) => socket.username === socketUsername
          );

          if (online) {
            dialogue.status = true;
            return dialogue;
          }

          dialogue.status = false;
          return dialogue;
        });
        return newDialogues;
      });
    });

    socket.on("user connected", ({ username }) => {
      const socketUsername = username;

      setDialogues((prevDialogues) => {
        let userIndex;

        prevDialogues.find((user, i) => {
          if (
            user.userOne === socketUsername ||
            user.userTwo === socketUsername
          ) {
            userIndex = i;
          }
        });

        if (userIndex === -1) return prevDialogues;

        prevDialogues[userIndex].status = true;
        return [].concat(prevDialogues);
      });
    });

    socket.on("user disconnected", ({ username }) => {
      const socketUsername = username;

      setDialogues((prevDialogues) => {
        let userIndex;

        prevDialogues.find((user, i) => {
          if (
            user.userOne === socketUsername ||
            user.userTwo === socketUsername
          ) {
            userIndex = i;
          }
        });

        if (userIndex === -1) return prevDialogues;

        prevDialogues[userIndex].status = false;
        return [].concat(prevDialogues);
      });
    });

    return () => {
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
    };
  }, [dialogues?.length]);

  return (
    <div className="inbox-container">
      <Dialogues
        setActiveDialogue={(active) => setActiveDialogue(active)}
        dialogues={dialogues}
        setDialogues={(dialogues) => setDialogues(dialogues)}
        setPublicProfile={(publicProfile) => setPublicProfile(publicProfile)}
      />

      <div className="direct-messages-container">
        {activeDialogue && (
          <Chat
            dialogue={dialogues.find((dialogue) => {
              return dialogue?._id === activeDialogue;
            })}
            publicId={publicProfile?._id}
          />
        )}
      </div>
      <div className="about-user-container">
        {activeDialogue && (
          <AboutUser
            dialogue={dialogues.find((dialogue) => {
              return dialogue._id === activeDialogue;
            })}
            publicId={publicProfile?._id}
            activeDialogue={activeDialogue}
            publicProfile={publicProfile}
            setPublicProfile={(profile) => setPublicProfile(profile)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
