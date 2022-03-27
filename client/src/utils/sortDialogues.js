export default function sortDialogues(dialogues, sort) {
  return dialogues.sort((conversationA, conversationB) => {
    const { last_updated: timestampA } = conversationA;
    const { last_updated: timestampB } = conversationB;

    const messageTimeA = new Date(timestampA).getTime();

    const messageTimeB = new Date(timestampB).getTime();

    if (sort == "newest first") {
      return messageTimeB - messageTimeA;
    } else if (sort == "last first") {
      return messageTimeA - messageTimeB;
    }
  });
}
