import { cn } from "@/lib/utils";
import Input from "./input";
import SentMessage from "./sent-message";
import ReceivedMessage from "./received-message";
import { useAppContext } from "@/providers/state-context-provider";
import React, { useEffect, useRef } from "react";
import SystemMessage from "./system-message";

const Chat = ({ isActive }: { isActive: boolean }) => {
  const { chatHistory } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistory]);
  return (
    <div className="flex-[0.85] h-full flex flex-col items-end justify-end transition-all gap-1">
      <div
        className={cn(
          "w-0 h-0 flex !border !border-[#575757] opacity-0 delay-300 transition-all !bg-[#1a1616] rounded-2xl overflow-hidden",
          isActive && "w-full h-full opacity-100"
        )}
      >
        <div
          className="w-full h-full overflow-y-scroll hide-scrollbar p-2 flex flex-col text-xs pb-40 gap-1"
          ref={containerRef}
        >
          {chatHistory.map(({ message, sender }, index) => {
            return (
              <React.Fragment key={index}>
                {sender === "user" && <SentMessage message={message} />}
                {sender === "ai" && <ReceivedMessage message={message} />}
                {sender === "system" && <SystemMessage message={message} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <Input isActive={isActive} />
    </div>
  );
};

export default Chat;
