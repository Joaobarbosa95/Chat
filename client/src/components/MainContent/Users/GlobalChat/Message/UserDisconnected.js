import formatTimestamp from "../../../../../utils/formatTimestamp";

const UserDisconnected = ({ username }) => {
  return (
    <>
      <div className="message-container">
        <div>
          <div className="message-text">{username} has left the chat</div>
          <div className="message-date">
            {formatTimestamp(new Date().getTime())}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDisconnected;
