import formatTimestamp from "../../../../utils/formatTimestamp";

const UserConnected = ({ username }) => {
  return (
    <>
      <div className="message-container">
        <div>
          <div className="message-text">{username} joined the chat</div>
          <div className="message-date">
            {formatTimestamp(new Date().getTime())}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserConnected;
