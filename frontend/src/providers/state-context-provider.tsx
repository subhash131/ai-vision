import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type StateContextType = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  websocket: WebSocket | undefined;
};

const StateContent = createContext<StateContextType>({
  isActive: false,
  setIsActive: () => {},
  websocket: undefined,
});
export const useAppContext = () => useContext(StateContent);

const StateContext = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const websocket = useMemo(() => {
    if (isActive) return new WebSocket("ws://localhost:8765");
    else return undefined;
  }, [isActive]);

  return (
    <StateContent.Provider value={{ isActive, setIsActive, websocket }}>
      {children}
    </StateContent.Provider>
  );
};

export default StateContext;
