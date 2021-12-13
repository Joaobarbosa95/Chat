import React, { useState } from "react";
import "./dialogues.css";
import { FaSearch } from "react-icons/fa";
import DialogueItem from "./DialogueItem";

const mock = [
  {
    username: "paulo",
    avatar: null,
    status: "Offline",
    messages: [
      {
        text: "lalalala waeawerawrawe aweraweafsdf a awerawfea df wefwaf sdf ew",
        time: new Date().getTime() - 172800000,
        status: "seen",
      },
      {
        text: "2342342342lalalala waeawerawrawe aweraweafsdf a awerawfea df wefwaf sdf ew",
        time: new Date().getTime() - 17280000,
        status: "unseen",
      },
    ],
  },
];

const Dialogues = () => {
  const [sortType, setSortType] = useState();
  const [dialogues, setDialogues] = useState();

  return (
    <>
      <form className="search">
        <input type="text" placeholder="Enter for search..." />
      </form>
      <div className="actions">
        <label htmlFor="sort">sort by:</label>
        <select name="sort">
          <option value="latest first">latest first</option>
          <option value="last first">last first</option>
        </select>
        <button onClick={() => {}} className="add-new-btn">
          imagem
        </button>
        <label htmlFor="add-new-btn" className="add-new-btn-label">
          Add New
        </label>
      </div>
      <div className="dialogues">
        {mock.map((user) => {
          return <DialogueItem key={user.username} user={user} />;
        })}
      </div>
    </>
  );
};

export default Dialogues;
