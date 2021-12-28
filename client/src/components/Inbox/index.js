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

  useEffect(() => {
    if (!socket) return;
    socket.on("new dialogue", ({ newConversation, activeDialogueId }) => {
      setDialogues((prevDialogues) => {
        const conversations = prevDialogues.filter(
          (conversation) => conversation._id !== activeDialogueId
        );

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
      />

      <div className="direct-messages-container">
        {activeDialogue && (
          <Chat
            activeDialogue={dialogues.find(
              (dialogue) => dialogue._id === activeDialogue
            )}
          />
        )}
      </div>
      <div className="about-user-container">
        {activeDialogue && (
          <AboutUser
            publicProfile={dialogues.find(
              (dialogue) => dialogue._id === activeDialogue
            )}
            activeDialogue={activeDialogue}
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
 *        -> Only save if a message is sent
 *        -> Update the Message database with a new entry: username1 - username2 - messages´
 *  7th -> setState newMessage: onChange event in the textarea field
 *        -> need to open a socket connection at login
 *        -> add newMessage to Messages on submit
 *        -> trigger a socket event to send it to server and save it to database
 *        -> trigger the socket event to send it to the receiver end
 *        -> useEffect triggered on private message received
 *        -> if not rendered, sort it to top dialogues(unless it's not sorted by last message), add a not seen messages number and the last message text in
 * 
 * At login/logout update the status in the public profile database (basically when the socket connection is closed)
 * 
 * Protect all routes except the Global Chat and Home/Login
 * 
 * Home after login will show the user public profile and edit options
 *
 * Add localStorage save to preserv the session and shared with other tabs
 * 
 * REFACTOR ALL THE GLOBAL CHAT 
 * /

/**
 * Open a socket connection at login - DONE
 * Send username and in the server look for the socketID to forward the message - DONE
 * 
 * Handle messages:
 * -> update the dialogues array
 * -> emit event "private message"
 * -> socket.on("private message") update the dialogues array -> Problem if user is not on the tab 
 * -> if user not on tab, should pop the orange dot on corner
 * ->  
 * 
 */
