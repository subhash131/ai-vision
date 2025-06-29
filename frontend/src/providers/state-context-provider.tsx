import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type StateContextType = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

const StateContent = createContext<StateContextType>({
  isActive: false,
  setIsActive: () => {},
});
export const useAppContext = () => useContext(StateContent);

const StateContext = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <StateContent.Provider value={{ isActive, setIsActive }}>
      {children}
    </StateContent.Provider>
  );
};

export default StateContext;
