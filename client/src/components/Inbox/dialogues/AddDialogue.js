import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../Contexts/UserContext";
// const mock = [
//   { name: "joao", _id: 1 },
//   { name: "lecas", _id: 2 },
//   { name: "yolo", _id: 3 },
//   { name: "nenem", _id: 4 },
//   { name: "joquinhas", _id: 5 },
// ];

const mock = [];
const AddDialogue = () => {
  const { user } = useUserContext();

  return (
    <div className="add-dialogue">
      <div className="search">
        <input type="text" placeholder="Insert name ..." />
      </div>
      <div className="add-dialogue-results">
        {mock.map((user) => (
          <DialogueResult user={user} key={user._id} />
        ))}
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
      <p>{user.name}</p>
    </div>
  );
}
