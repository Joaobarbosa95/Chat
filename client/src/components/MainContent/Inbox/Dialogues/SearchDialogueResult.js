import { FaUserCircle } from "react-icons/fa";
import { useChatContext } from "../../../../Contexts/ChatContext";
import { useUserContext } from "../../../../Contexts/UserContext";
import axios from "axios";

export default function SearchDialogueResult({ searchedUser, setAddDialogue }) {
  const { setPublicId, setUsername, setActiveDialogue } = useChatContext();
  const { user } = useUserContext();

  return (
    <div
      className="dialogue-result"
      onClick={async (e) => {
        const res = await axios({
          method: "POST",
          url: "http://localhost:4000/inbox/conversationid",
          data: { username: searchedUser.username },
          headers: {
            authorization: "Bearer " + user.token,
          },
        });

        res.data.length === 0
          ? user.socket.emit("new dialogue", {
              username: searchedUser.username,
            })
          : setActiveDialogue(res.data[0]._id);

        setPublicId(searchedUser._id);
        setUsername(searchedUser.username);
        setAddDialogue(false);
      }}
    >
      {undefined ? (
        <img
          src={searchedUser?.avatar}
          alt="avatar"
          className="avatar-search"
        />
      ) : (
        <FaUserCircle className="avatar-search" />
      )}
      <p>{searchedUser?.username || ""}</p>
    </div>
  );
}
