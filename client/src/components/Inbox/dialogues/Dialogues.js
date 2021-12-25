import React, { useState, useEffect } from "react";
import "./dialogues.css";
import { FaSearch } from "react-icons/fa";
import DialogueItem from "./DialogueItem";
import { useUserContext } from "../../Contexts/UserContext";

function sortDialogues(dialogues, sort) {
  return [].concat(dialogues).sort((conversationA, conversationB) => {
    const { messages: messagesA } = conversationA;
    const { messages: messagesB } = conversationB;

    const messageTimeA = new Date(
      messagesA[messagesA.length - 1].timestamp
    ).getTime();

    const messageTimeB = new Date(
      messagesB[messagesB.length - 1].timestamp
    ).getTime();

    if (sort == "latest first") {
      return messageTimeB - messageTimeA;
    } else if (sort == "last first") {
      return messageTimeA - messageTimeB;
    }
  });
}

const Dialogues = ({ setActiveDialogue, dialogues, setDialogues }) => {
  const { user } = useUserContext();

  const [sortType, setSortType] = useState("latest first");

  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    if (dialogues.length === 0) return;
    const sortedDialogues = sortDialogues(dialogues, sortType);

    setDialogues(sortedDialogues);
  }, [sortType]);

  useEffect(() => {
    const url = "http://localhost:4000/inbox/dialogues";

    const bearer = "Bearer " + user?.token;

    const opts = {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: bearer,
      },
    };

    fetch(url, opts)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return;
        const sortedDialogues = sortDialogues(res, sortType);
        if (!sortedDialogues[0]) return;

        setDialogues(sortedDialogues);
        setActiveDialogue(sortedDialogues[0]._id);
      });
  }, []);

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Enter for search..."
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>
      <div className="actions">
        <label htmlFor="sort">Sort By:</label>
        <select
          name="sort"
          onChange={(e) => {
            setSortType(e.target.value);
          }}
        >
          <option value="latest first">latest first</option>
          <option value="last first">last first</option>
        </select>
        <label htmlFor="add-new-btn" className="add-new-btn-label">
          Add New
        </label>
        <button onClick={() => {}} className="add-new-btn">
          +
        </button>
      </div>
      <div className="dialogues">
        {dialogues
          .filter(
            (dialogue) =>
              dialogue.userOne.startsWith(searchUser) ||
              dialogue.userTwo.startsWith(searchUser)
          )
          .map((dialogue) => {
            return (
              <DialogueItem
                setActiveDialogue={(active) => setActiveDialogue(active)}
                key={dialogue._id}
                dialogue={dialogue}
              />
            );
          })}
      </div>
    </>
  );
};

export default Dialogues;
