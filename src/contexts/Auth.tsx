import React, { createContext, useState, useEffect } from "react";

import * as Google from "expo-google-app-auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../firebaseConnection";

interface User {
  userName: string;
  tag: string;
  avatar?: string | null;
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

  async function handleStateChanged(firebaseUser: any) {
    if (firebaseUser && (finishedLogin || isAnonymous)) {
      //Verifica se o usuário é anônimo, de forma a escapar da requisição
      if (isAnonymous) {
        return;
      }

      await firebase
        .firestore()
        .collection("users")
        .doc(firebaseUser.uid)
        .get()
        .then((doc) => {
          const userName = doc.data().userName;
          const tag = doc.data().tag;
          const avatar = doc.data().avatar;

          setUser({ userName, tag, avatar });
          console.log(user);
        });

      // Navega para o StackRoutes
      setSigned(true);
    } else {
      setSigned(false);
    }
  }

  useEffect(() => {
    //Observer: verifica quando o usuário sofre alterações (loga ou desloga)
    firebase.auth().onAuthStateChanged(handleStateChanged);
  }, []);

  async function login({ ...props }: User) {
    // setUser({ ...props });
    // console.log(user);

    //Ajusta as condições de estado do usuário
    setFinishedLogin(true);
    setIsAnonymous(false);

    //Loga o usuário forçadamente
    setSigned(true);
  }

  function loginAnonymously() {
    // Ajusta primeiro o isAnonymous, pois a função handleStateChanged só é chamada depois da requisição no firebase
    setIsAnonymous(true);

    firebase
      .auth()
      .signInAnonymously()
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
    //Ajusta as condições de estado do usuário
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
