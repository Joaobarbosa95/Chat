import { useRef, useEffect } from "react";

export default function useAutoScroll(messages, observerMessageBox) {
  const observerMessageBottom = useRef(null);

  // Scroll to new message
  const scrollToLastMessageReceived = (element) => {
    element.scrollIntoView({
      behavior: "auto",
    });
  };

  useEffect(() => {
    if (!observerMessageBox || !observerMessageBottom) return;

    // If scroll bar is moved 100px, don't auto scroll to new message
    // (user might be reading the chat)
    if (
      observerMessageBox.current.scrollTopMax -
        observerMessageBox.current.scrollTop <
      100
    )
      scrollToLastMessageReceived(observerMessageBottom.current);
  }, [messages, observerMessageBottom, observerMessageBox]);

  return { observerMessageBottom };
}
