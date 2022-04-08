import { FaUserCircle } from "react-icons/fa";
import { useChatContext } from "../../../../Contexts/ChatContext";
import { useUserContext } from "../../../../Contexts/UserContext";

export default function SearchDialogueResult({
  searchedUser,
  setAddDialogue,
  dialogues,
}) {
  const {
    onlineUsers,
    setPublicId,
    setUsername,
    setActiveDialogue,
    setStatus,
  } = useChatContext();
  const { userState } = useUserContext();

  return (
    <div
      className="dialogue-result"
      onClick={async (e) => {
        // Search dialogue already loaded
        const dialogueAlreadyLoaded = dialogues.find(
          (dialogue) =>
            dialogue.userOne === searchedUser.username ||
            dialogue.userTwo === searchedUser.username
        );

        const userFound = onlineUsers.find(
          (user) => user.username === searchedUser
        );
        if (userFound) setStatus("online");

        if (dialogueAlreadyLoaded) {
          setPublicId(dialogueAlreadyLoaded._id);
          setUsername(searchedUser.username);
          setActiveDialogue(dialogueAlreadyLoaded.conversationId);

          setAddDialogue(false);

          return;
        }

        userState.socket.emit("new dialogue", {
          username: searchedUser.username,
        });

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
