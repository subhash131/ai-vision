import { cn } from "@/lib/utils";
import Input from "./input";
import SentMessage from "./sent-message";
import ReceivedMessage from "./received-message";

const Chat = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex-[0.85] h-full flex flex-col items-end justify-end transition-all gap-1">
      <div
        className={cn(
          "w-0 h-0 flex !border !border-[#575757] opacity-0 delay-300 transition-all !bg-[#1a1616] rounded-2xl overflow-hidden",
          isActive && "w-full h-full opacity-100"
        )}
      >
        <div className="w-full h-full overflow-y-scroll hide-scrollbar p-2 flex flex-col text-xs pb-40 gap-1">
          <SentMessage message="hello" />
          <ReceivedMessage message="hello" />
          <SentMessage message="hello" />
          <ReceivedMessage message="hello" />
          <SentMessage message="hello" />
          <ReceivedMessage message="hello" />
          <SentMessage message="hello" />
          <SentMessage message="hello" />
          <SentMessage message="hello" />
          <ReceivedMessage message="hello" />
          <ReceivedMessage message="hello" />
        </div>
      </div>
      <Input isActive={isActive} />
    </div>
  );
};

export default Chat;
