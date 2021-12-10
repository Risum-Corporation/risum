import React, { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./Auth";

import firebase from "../database/firebaseConnection";

interface StackContextData {
  isWhiteMode: boolean;
  toggleWhiteMode(): void;
}

const StackContext = createContext<StackContextData>({} as StackContextData);

export const StackProvider: React.FC = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [isWhiteMode, setIsWhiteMode] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setIsWhiteMode(user?.whiteMode);
    }
  }, [user]);

  async function toggleWhiteMode() {
    setIsWhiteMode(!isWhiteMode);

    if (user?.uid) {
      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .get()
        .then((doc) => {
          const newTheme = !doc.data()?.whiteMode;
          doc.ref.update({ whiteMode: newTheme });
        });
    }
  }

  return (
    <StackContext.Provider value={{ isWhiteMode, toggleWhiteMode }}>
      {children}
    </StackContext.Provider>
  );
};

export default StackContext;
