import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";

interface StackContextData {
  isWhiteMode: boolean;
  toggleWhiteMode(): void;
}

const StackContext = createContext<StackContextData>({} as StackContextData);

export const StackProvider: React.FC = ({ children }) => {
  const [isWhiteMode, setIsWhiteMode] = useState(false);

  function toggleWhiteMode() {
    setIsWhiteMode(!isWhiteMode);
  }

  return (
    <StackContext.Provider value={{ isWhiteMode, toggleWhiteMode }}>
      {children}
    </StackContext.Provider>
  );
};

export default StackContext;
