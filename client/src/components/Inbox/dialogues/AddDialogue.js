import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../Contexts/UserContext";
import useUserSearch from "../../../services/hooks/useUserSearch";
import SearchDialogueResult from "./SearchDialogueResult";

const AddDialogue = ({ addDialogue, setAddDialogue }) => {
  const { user } = useUserContext();
  const [userSearchInput, setUserSearchInput] = useState("");

  const { loading, error, hasMore, userSearch, notFound } = useUserSearch(
    user.token,
    userSearchInput
  );

  return (
    <div className={`${addDialogue ? "" : "add-dialogue-hidden"}`}>
      <button
        className="close-add-dialogue"
        onClick={() => {
          setUserSearchInput("");
          setAddDialogue(false);
        }}
      >
        x
      </button>
      <div className="add-dialogue">
        <div className="search">
          <input
            type="text"
            placeholder="Enter to search ..."
            onChange={(e) => setUserSearchInput(e.target.value)}
          />
        </div>
        <div className="add-dialogue-results">
          {notFound && <p style={{ textAlign: "center" }}>Results not found</p>}
          {userSearch.map((searchedUser) => (
            <SearchDialogueResult
              searchedUser={searchedUser}
              conversationId={searchedUser}
              key={searchedUser._id}
              setAddDialogue={(boolean) => setAddDialogue(boolean)}
            />
          ))}
          {loading && "Loading..."}
          {error && "An error occured"}
        </div>
      </div>
    </div>
  );
};

export default AddDialogue;
