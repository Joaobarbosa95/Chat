import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../Contexts/UserContext";

// const mock = [
//   { name: "joao", _id: 1 },
//   { name: "lecas", _id: 2 },
//   { name: "yolo", _id: 3 },
//   { name: "nenem", _id: 4 },
//   { name: "joquinhas", _id: 5 },
// ];

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

const AddDialogue = ({ addDialogue, setAddDialogue }) => {
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
            <p style={{ textAlign: "center" }}>Result not found</p>
          ) : (
            searchResults.map((user) => (
              <DialogueResult user={user} key={user._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDialogue;

function DialogueResult({ user }) {
  return (
    <div className="dialogue-result">
      {undefined ? (
        <img src={user.avatar} alt="avatar" className="avatar-search" />
      ) : (
        <FaUserCircle className="avatar-search" />
      )}
      <p>{user.username}</p>
    </div>
  );
}
