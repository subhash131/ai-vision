import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/state-context-provider";

const Menu = ({ isActive }: { isActive: boolean }) => {
  const { setIsPinned } = useAppContext();
  return (
    <div className="flex-[0.15] size-full flex flex-col items-end justify-end">
      <div className="size-full"></div>
      <div className="flex flex-col gap-1 h-fit">
        <div
          className={cn(
            "!size-10 rounded-full !border !border-[#575757] !bg-[#1a1616] flex items-center justify-center cursor-pointer opacity-0 transition-opacity delay-300 pointer-events-none",
            isActive && "opacity-100 pointer-events-auto"
          )}
        >
          <Mic size={16} />
        </div>
        <div
          className="!size-10 rounded-full !border !border-[#575757] !bg-[#1a1616] flex items-center justify-center cursor-pointer"
          onClick={() => {
            setIsPinned((prev) => !prev);
          }}
        >
          AI
        </div>
      </div>
    </div>
  );
};

export default Menu;
