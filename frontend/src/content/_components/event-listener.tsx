import { useAppContext } from "@/providers/state-context-provider";
import { useEffect, useRef } from "react";

const EventListener = () => {
  const {
    isActive,
    websocket,
    message,
    setMessage,
    setChatHistory,
    isInputActive,
  } = useAppContext();
  const messageRef = useRef(message);
  const inputActiveRef = useRef(isInputActive);
  const aiBufferRef = useRef("");

  useEffect(() => {
    messageRef.current = message;
    inputActiveRef.current = isInputActive;
  }, [message, isInputActive]);

  useEffect(() => {
    if (!isActive || !websocket) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        const latestMessage = messageRef.current;
        const inputActive = inputActiveRef.current;

        if (!latestMessage || !inputActive) return;

        setChatHistory((prev) => [
          ...prev,
          { message: latestMessage, sender: "user" },
        ]);
        websocket.send(latestMessage);
        setMessage("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    websocket.onerror = (e) => {
      console.log("WebSocket connection error", e);
      setChatHistory((prev) => [
        ...prev,
        { message: "Error connecting to server", sender: "system" },
      ]);
    };
    websocket.onopen = () => {
      setChatHistory((prev) => [
        ...prev,
        { message: "Connected to server", sender: "system" },
      ]);
      console.log("WebSocket connection opened");
    };
    websocket.onclose = () => {
      setChatHistory((prev) => [
        ...prev,
        { message: "Connection closed", sender: "system" },
      ]);
      console.log("WebSocket connection closed");
    };
    websocket.onmessage = (e) => {
      if (e.data === "Response Complete") {
        aiBufferRef.current = ""; // Clear buffer when complete
      } else {
        aiBufferRef.current += e.data;

        setChatHistory((prev) => {
          const lastMessage = prev[prev.length - 1];

          if (lastMessage?.sender === "ai") {
            // Update existing AI message
            const updatedHistory = [...prev];
            updatedHistory[updatedHistory.length - 1] = {
              ...lastMessage,
              message: aiBufferRef.current,
            };
            return updatedHistory;
          } else {
            // First AI chunk, add new AI message
            return [...prev, { message: aiBufferRef.current, sender: "ai" }];
          }
        });
      }
    };

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      websocket.close();
    };
  }, [isActive, websocket]);

  return null;
};

export default EventListener;
