import { cn } from "@/lib/utils";
import Chat from "./_components/chat";
import Menu from "./_components/menu";
import { useAppContext } from "@/providers/state-context-provider";
import EventListener from "./_components/event-listener";

const Content = () => {
  const { isActive, setIsActive, isPinned } = useAppContext();

  return (
    <div className="size-full flex flex-row-reverse !text-white">
      <EventListener />
      <div className="w-[30rem] h-full flex items-end justify-end !pr-20 !pb-10">
        <div
          className={cn(
            "w-fit h-fit flex pointer-events-auto gap-1 transition-all delay-300",
            isActive && "h-full w-[30rem]"
          )}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => {
            if (!isPinned) setIsActive(false);
          }}
        >
          <Chat isActive={isActive} />
          <Menu isActive={isActive} />
        </div>
      </div>
    </div>
  );
};

export default Content;
