export default function sortDialogues(dialogues, sort) {
  return [].concat(dialogues).sort((conversationA, conversationB) => {
    const { messages: messagesA } = conversationA;
    const { messages: messagesB } = conversationB;

    const messageTimeA = new Date(
      messagesA[messagesA.length - 1].timestamp
    ).getTime();

    const messageTimeB = new Date(
      messagesB[messagesB.length - 1].timestamp
    ).getTime();

    if (sort == "latest first") {
      return messageTimeB - messageTimeA;
    } else if (sort == "last first") {
      return messageTimeA - messageTimeB;
    }
  });
}
