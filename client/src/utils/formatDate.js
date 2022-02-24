export default function formatDate(timestamp) {
  let lastMessageTime = new Date().getTime() - new Date(timestamp).getTime();

  if (!lastMessageTime) {
    lastMessageTime = "";
  } else if (lastMessageTime < 60000) {
    lastMessageTime = "Now";
  } else if (lastMessageTime < 3600000) {
    lastMessageTime = parseInt(lastMessageTime / 1000 / 60) + "min";
  } else if (lastMessageTime < 86400000) {
    lastMessageTime = parseInt(lastMessageTime / 1000 / 60 / 60) + "h";
  } else if (lastMessageTime < 604800000) {
    lastMessageTime = parseInt(lastMessageTime / 1000 / 60 / 60 / 24) + "d";
  } else {
    lastMessageTime = parseInt(lastMessageTime / 1000 / 60 / 60 / 24 / 7) + "w";
  }

  return lastMessageTime;
}
