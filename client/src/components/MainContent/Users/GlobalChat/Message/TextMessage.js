import formatTimestamp from "../../../../../utils/formatTimestamp";

const TextMessage = ({ username, text, time }) => {
  return (
    <>
      <div className="message-container">
        <div>
          <div>{username}</div>
          <div className="message-text">{text}</div>
          <div className="message-date">{formatTimestamp(time)}</div>
        </div>
      </div>
    </>
  );
};

export default TextMessage;
