import React, { useState } from "react";
import "./inbox.css";

import Dialogues from "./dialogues/Dialogues";
import Chat from "./chat/Chat";
import AboutUser from "./aboutUser/AboutUser";

const Index = () => {
  const [activeDialogue, setActiveDialogue] = useState();
  const [dialogues, setDialogues] = useState([]);

  console.log("active", activeDialogue);
  return (
    <div className="inbox-container">
      <div className="dialogues-container">
        <Dialogues
          setActiveDialogue={(active) => setActiveDialogue(active)}
          dialogues={dialogues}
          setDialogues={(dialogues) => setDialogues(dialogues)}
        />
      </div>
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



  2nd 
    Render the last messages received in middle chat (chat component) 

  3rd 
    At the same time render about user information

*/

/**
 * Write mock data for databases using the blueprint above
 */

/**
 * User stories
 * 1st Wanna be able to see the latest messages received and by whom sorted this way (dialogues box)
 *  2nd When click a dialogue box, render the conversation in the chat (middle section)
 *  3rd The about user renders at the same time as the chat conversation (for now)
 *  4th Wanna be able to sort my messages by: last message, first message, name a-z, name z-a
 *  5th Wanna be able to search a conversation in the input field by name
 *  6th Wanna be able to add a new conversation to the list
 *  7th Wanna be able to send chat messages to other people
 *
 * 1st -> Fetch the messages database(fetch all messages with username id) - DONE
 *       -> Sort them by last message received and calculate the number of messages unread - DONE
 *       -> setState the messages fetched - DONE
 *       -> Render the messages in the dialogues with a .map - DONE
 *
 *  2nd -> Render the last message received dialogue in the chat as default -DONE
 *          -> Create a state with the active user being rendered in the dialogue box and about user component
 *         -> When clicked render the conversation and fetch the about user info
 *         -> setState the about user info and render it
 *
 * 3rd -> Done
 *
 *  4th -> Use different sort algos on the onClick event in the select element target
 *
 *  5th -> if search input field is empty render all conversations, if not start filtering by the name being written: filter the available dialogues by name using a onChange event setting a setState inputValue
 *
 *  6th -> Create a form to add a username to the dialogues list
 *        -> Input on change method to sent the form data to the server
 *        -> Only save if a message is sent
 *        -> Update the Message database with a new entry: username1 - username2 - messages´
 *
 *  7th -> setState newMessage: onChange event in the textarea field
 *        -> need to open a socket connection at login
 *        -> add newMessage to Messages on submit
 *        -> trigger a socket event to send it to server and save it to database
 *        -> trigger the socket event to send it to the receiver end
 *        -> useEffect triggered on private message received
 *        -> if not rendered, sort it to top dialogues(unless it's not sorted by last message), add a not seen messages number and the last message text in
 */
