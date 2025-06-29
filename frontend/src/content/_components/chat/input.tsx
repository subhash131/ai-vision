import { cn } from "@/lib/utils";

const Input = ({ isActive }: { isActive: boolean }) => {
  return (
    <textarea
      className={cn(
        "!resize-none h-10 hide-scrollbar !border !border-[#575757] !bg-[#1a1616] w-0 transition-all  rounded-2xl opacity-0 !p-0",
        isActive && " w-full opacity-100 !px-4 shrink-0 !pt-1"
      )}
      placeholder="type..."
      autoFocus={isActive}
    />
  );
};

export default Input;
