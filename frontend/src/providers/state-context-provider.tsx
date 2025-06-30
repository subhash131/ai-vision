import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type Message = {
  sender: "user" | "ai" | "system";
  message: string;
};

type StateContextType = {
  websocket: WebSocket | undefined;
  isActive: boolean;
  isPinned: boolean;
  message: string;
  chatHistory: Message[];
  setIsActive: Dispatch<SetStateAction<boolean>>;
  setIsPinned: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setChatHistory: Dispatch<SetStateAction<Message[]>>;
  isInputActive: boolean;
  setIsInputActive: Dispatch<SetStateAction<boolean>>;
};

const StateContent = createContext<StateContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(StateContent);
  if (!context) {
    throw new Error("useAppContext must be used within StateContext Provider");
  }
  return context;
};

const StateContext = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const websocket = useMemo(() => {
    if (isActive) return new WebSocket("ws://localhost:8765");
    return undefined;
  }, [isActive]);

  return (
    <StateContent.Provider
      value={{
        isActive,
        setIsActive,
        websocket,
        chatHistory,
        setChatHistory,
        message,
        setMessage,
        isPinned,
        setIsPinned,
        isInputActive,
        setIsInputActive,
      }}
    >
      {children}
    </StateContent.Provider>
  );
};

export default StateContext;
