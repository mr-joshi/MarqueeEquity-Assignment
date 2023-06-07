import type React from "react";
import { ReactNode, createContext, useState } from "react";

interface AppContextProps {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}
const AppContext = createContext<AppContextProps>({} as AppContextProps);
const AppProvider= ({ children }:{children:ReactNode}) => {
  const [data, setData] = useState<string>("");
  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
