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
              return dialogue._id === activeDialogue;
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

/* 
  1st
    Fecth the last conversations (ordered by the last message received)
      -> Information object draft: (this can be phased, depends on the database tables it is divided)
         user {
          name: String;
          status: String; 
          messages: messages[]
          publicProfile: {
            from: String,
            description: String,
            contacts: {
              phone: String,
              email: String,
              other: String
            }
            more: String,
          }
        }

        messages [{   
          username: String, 
          messages: [{
            text: String;
            time: Date;
            sender: String,
            seen: boolean
          }]   
        }] 
    
    -> Databases
        Login/Create uuser : username - password
        Private Profile: private stuff 
        Public Profile: username? - from - description - phone - email - other - more
        Messages: username1 - username2 - messages {sender: String, seen: boolean, text: String, time: Date }
*/

/**
 * At login/logout update the status in the public profile database (basically when the socket connection is closed)
 *
 * Protect all routes except the Global Chat and Home/Login
 *
 * Home after login will show the user public profile and edit options
 *
 * Add localStorage save to preserv the session and shared with other tabs
 *
 * REFACTOR ALL THE GLOBAL CHAT
 *
 * AuthContext to protect routes as it should be
 */
