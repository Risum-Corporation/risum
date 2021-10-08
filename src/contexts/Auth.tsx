import React, { createContext, useState, useEffect } from "react";

import * as Google from "expo-google-app-auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../firebaseConnection";

import signIn from "../services/auth";

interface User {
  userName: string;
  email: string;
  avatar: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  isAnonymous: boolean;

  login({ ...props }: User): Promise<void>;
  loginAnonymously(): void;
  signOut(): void;
  signInWithGoogleAsync(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const [finishedLogin, setFinishedLogin] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  function handleStateChanged(firebaseUser: any) {
    if (firebaseUser && (finishedLogin || isAnonymous)) {
      setSigned(true);
    } else {
      setSigned(false);
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(handleStateChanged);

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

    setFinishedLogin(true);
    firebase.auth().onAuthStateChanged(handleStateChanged);
  }

  function loginAnonymously() {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        setIsAnonymous(true);
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous login in your firebase console");
        } else {
          console.log(error.code);
        }
      });
  }

  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
    setIsAnonymous(false);
    setFinishedLogin(false);
    firebase.auth().signOut();
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "402831587288-o8sm81qel545r1oinhs21gvmgq5489fh.apps.googleusercontent.com",
        iosClientId:
          "402831587288-537l0p9v2r574up5tm49937c4bkqarru.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed,
        user,
        loading,
        isAnonymous,
        login,
        loginAnonymously,
        signOut,
        signInWithGoogleAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
