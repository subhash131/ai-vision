import { useAppContext } from "@/providers/state-context-provider";
import { useEffect } from "react";

const EventListener = () => {
  const { isActive } = useAppContext();
  useEffect(() => {
    if (!isActive) return;
    document.onkeydown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
      }
    };
    return () => {
      document.onkeydown = null;
    };
  }, [isActive]);
  return <></>;
};

export default EventListener;
