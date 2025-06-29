import { cn } from "@/lib/utils";
import Input from "./input";

const Chat = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex-[0.85] h-full flex flex-col items-end justify-end transition-all gap-1">
      <div
        className={cn(
          "w-0 h-0 flex !border !border-[#575757] opacity-0 delay-300 transition-all !bg-[#1a1616] rounded-2xl",
          isActive && "w-full h-full opacity-100"
        )}
      >
        <div className="w-full h-fit max-h-96 overflow-y-scroll hide-scrollbar">
          <div className="h-screen"></div>
        </div>
      </div>
      <Input isActive={isActive} />
    </div>
  );
};

export default Chat;
