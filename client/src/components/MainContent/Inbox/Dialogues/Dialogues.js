import React, { useState, memo } from "react";
import "./dialogues.css";
import DialogueItem from "./DialogueItem";
import AddDialogue from "./AddDialogue";
import { useUserContext } from "../../../../Contexts/UserContext";
import sortDialogues from "../../../../utils/sortDialogues";
import useDialoguesQuery from "../../../../services/hooks/useDialoguesQuery";

const Dialogues = () => {
  const { userState } = useUserContext();

  const [sortType, setSortType] = useState("newest first");

  const [searchUser, setSearchUser] = useState("");

  const [addDialogue, setAddDialogue] = useState(false);

  const [conversationsLoaded, setConversationsLoaded] = useState(0);

  const { loading, error, hasMore, dialogues } = useDialoguesQuery(
    userState.token,
    conversationsLoaded
  );

  // useEffect(() => {
  //   if (dialogues.length === 0) return;
  //   const sortedDialogues = sortDialogues(dialogues, sortType);
  // }, [sortType]);

  // const observer = useRef();
  // const lastDialogueElementRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setConversationsLoaded(dialogues.length - 1);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [loading, hasMore]
  // );

  return (
    <div
      className={`dialogues-container ${
        addDialogue ? "inactive-overflow" : ""
      }`}
    >
      <AddDialogue
        addDialogue={addDialogue}
        setAddDialogue={(boolean) => setAddDialogue(boolean)}
        dialogues={dialogues}
      />
      <div className={addDialogue ? "inactive" : ""}>
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
            <option value="newest first">newest first</option>
            <option value="last first">last first</option>
          </select>
          <label htmlFor="add-new-btn" className="add-new-btn-label">
            Add New
          </label>
          <button onClick={(e) => setAddDialogue(true)} className="add-new-btn">
            +
          </button>
        </div>
        <div className="dialogues">
          {sortDialogues(dialogues, sortType)
            .filter(
              (dialogue) =>
                dialogue.userOne.startsWith(searchUser) ||
                dialogue.userTwo.startsWith(searchUser)
            )
            .map((dialogue) => {
              return (
                <DialogueItem
                  key={dialogue.conversationId}
                  dialogue={dialogue}
                />
              );
            })}
          {loading && "Loading..."}
          {error && "An error occured"}
        </div>
      </div>
    </div>
  );
};

export default memo(Dialogues);
