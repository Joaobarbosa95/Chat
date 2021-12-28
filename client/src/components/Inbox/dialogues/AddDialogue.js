import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../Contexts/UserContext";

async function searchUser(user, username) {
  const url = "http://localhost:4000/inbox/dialogue-search";
  const bearer = "Bearer " + user?.token;

  const opts = {
    method: "POST",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username.trim().toLowerCase() }),
  };

  const res = await fetch(url, opts);
  const data = await res.json();
  console.log(data);
  return data;
}

const AddDialogue = ({
  addDialogue,
  setAddDialogue,
  setDialogues,
  setActiveDialogue,
}) => {
  const { user } = useUserContext();
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  return (
    <div className={`${addDialogue ? "" : "add-dialogue-hidden"}`}>
      <button
        className="close-add-dialogue"
        onClick={() => {
          setUserSearch("");
          setSearchResults([]);
          setNotFound(false);
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
            onKeyDown={async (e) => {
              if (e.code !== "Enter") return;
              setNotFound(false);
              const data = await searchUser(user, userSearch);
              if (data.length === 0) return setNotFound(true);
              setSearchResults(data);
            }}
            onChange={(e) => setUserSearch(e.target.value)}
          />
        </div>
        <div className="add-dialogue-results">
          {notFound ? (
            <p style={{ textAlign: "center" }}>Results not found</p>
          ) : (
            searchResults.map((searchedUser) => (
              <DialogueResult
                searchedUser={searchedUser}
                user={user}
                key={searchedUser._id}
                setUserSearch={(res) => setUserSearch(res)}
                setSearchResults={(res) => setSearchResults(res)}
                setNotFound={(boolean) => setNotFound(boolean)}
                setAddDialogue={(boolean) => setAddDialogue(boolean)}
                setDialogues={(data) => setDialogues(data)}
                setActiveDialogue={(id) => setActiveDialogue(id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDialogue;

function DialogueResult({
  searchedUser,
  user,
  setUserSearch,
  setSearchResults,
  setNotFound,
  setAddDialogue,
  setDialogues,
  setActiveDialogue,
}) {
  return (
    <div
      className="dialogue-result"
      onClick={(e) => {
        setUserSearch("");
        setSearchResults([]);
        setNotFound(false);
        setAddDialogue(false);

        // Add a clause: if it is in dialogues, it cannot be added again
        setDialogues((prevDialogues) => [
          {
            _id: searchedUser._id,
            userOne: user.username,
            userTwo: searchedUser.username,
            messages: [],
          },
          ...prevDialogues,
        ]);

        setActiveDialogue(searchedUser._id);
      }}
    >
      {undefined ? (
        <img src={searchedUser.avatar} alt="avatar" className="avatar-search" />
      ) : (
        <FaUserCircle className="avatar-search" />
      )}
      <p>{searchedUser.username}</p>
    </div>
  );
}
