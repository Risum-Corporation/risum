import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../firebaseConnection";

import signIn from "../services/auth";

interface User {
  userName: string | null;
  email: string | null;
  avatar: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;

  login({ ...props }: User): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@risum:user");
      const storagedToken = await AsyncStorage.getItem("@risum:token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setLoading(false);

        console.log(storagedUser);
      }
    }

    loadStoragedData();
  }, []);

  async function login({ ...props }: User) {
    const response = await signIn(props);

    setUser(response.user);

    await AsyncStorage.setItem("@risum:user", JSON.stringify(response.user));
    await AsyncStorage.setItem("@risum:token", response.token);
  }

  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
    firebase.auth().signOut();
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, login, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
