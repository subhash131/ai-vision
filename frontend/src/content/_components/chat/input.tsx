import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/state-context-provider";

const Input = ({ isActive }: { isActive: boolean }) => {
  const { message, setMessage, setIsInputActive } = useAppContext();

  return (
    <textarea
      className={cn(
        "!resize-none h-10 hide-scrollbar !border !border-[#575757] !bg-[#1a1616] w-0 transition-all  rounded-2xl opacity-0 !p-0 text-xs",
        isActive && " w-full opacity-100 !px-4 shrink-0 !pt-1"
      )}
      placeholder="type..."
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      value={message}
      onFocus={() => {
        setIsInputActive(true);
      }}
      onBlur={() => {
        setIsInputActive(false);
      }}
    />
  );
};

export default Input;
