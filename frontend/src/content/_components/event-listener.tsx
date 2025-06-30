import { useAppContext } from "@/providers/state-context-provider";
import { useEffect } from "react";

const EventListener = () => {
  const { isActive, websocket } = useAppContext();
  useEffect(() => {
    if (!isActive) return;
    document.onkeydown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
      }
    };

    //websocket
    if (!websocket) return;
    websocket.onopen = () => {
      console.log("websocket connection opened");
    };
    websocket.onclose = () => {
      console.log("websocket connection closed");
    };

    return () => {
      document.onkeydown = null;
      websocket.close();
    };
  }, [isActive]);

  return <></>;
};

export default EventListener;
