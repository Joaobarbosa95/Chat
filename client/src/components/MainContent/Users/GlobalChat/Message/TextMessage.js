import formatTimestamp from "../../../../../utils/formatTimestamp";
import { useUserContext } from "../../../../../Contexts/UserContext";

const TextMessage = ({ username, text, time }) => {
  const { userState } = useUserContext();
  const { username: you } = userState;

  let style = {};

  if (username === you)
    style = {
      float: "right",
    };

  return (
    <>
      <div className="message-container">
        <div style={style}>
          <div>{username}</div>
          <div className="message-text">{text}</div>
          <div className="message-date">{formatTimestamp(time)}</div>
        </div>
      </div>
    </>
  );
};

export default TextMessage;
