import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import signIn from "../services/auth";

interface User {
  userName: string;
  email: string;
  //     photo: string;
  //     password: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;

  login(): Promise<void>;
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

  async function login() {
    const response = await signIn();

    setUser(response.user);

    await AsyncStorage.setItem("@risum:user", JSON.stringify(response.user));
    await AsyncStorage.setItem("@risum:token", response.token);
  }

  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
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
