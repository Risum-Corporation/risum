import React, { createContext, useState, useEffect } from "react";

import * as Google from "expo-google-app-auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../database/firebaseConnection";

interface User {
  userName: string;
  uid: string;
  tag: string;
  avatar?: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  isAnonymous: boolean;

  login(firebaseUser: any): void;
  loginAnonymously(): void;
  signOut(): void;
  signInWithGoogleAsync(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  async function handleStateChanged(firebaseUser: any) {
    //Verifica se o usuário é anônimo, de forma a escapar da requisição
    if (isAnonymous) {
      return setSigned(true);
    } else if (firebaseUser) {
      // Verifica se o usuário já está conectado através da persistência
      console.log(firebaseUser)
        login(firebaseUser)
        console.log('boa noite')
    } else {
      // Usuário não está logado
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(handleStateChanged)
  }, [])
  
  async function login(firebaseUser: any) {
    // setUser({ ...props });
    // console.log(user);
    console.log("Entrei no login kkk")
    if (firebaseUser.isAnonymous || isAnonymous) {
      return setSigned(true);
    }

    //Ajusta as condições de estado do usuário
    setIsAnonymous(false);

    await firebase
      .firestore()
      .collection("users")
      .doc(firebaseUser.uid)
      .get()
      .then((doc: any) => {
        const userName = doc.data().userName;
        const tag = doc.data().tag;
        const avatar = doc.data().userImage;
        const uid = firebaseUser.uid;

        setUser({ userName, uid, tag, avatar });

        // Se você vir essa mensagem no console, quer dizer que tudo deu certo
        console.log("Fé na sogrinha login");

        // Navega para o StackRoutes
        setSigned(true);
      });

    // // Execução da handleStateChanged de maneira forçada
    // const auth = firebase.auth().currentUser;
    // handleStateChanged(auth);
  }

  async function loginAnonymously() {
    // Ajusta primeiro as condições de estado do usuário, pois a função handleStateChanged só é chamada depois da requisição no firebase
    setIsAnonymous(true);

    await firebase
      .auth()
      .signInAnonymously()
      .then((cred) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE) // Remoção da persistência (usuário anônimo)
        login(cred.user);
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
    //Ajusta as condições de estado do usuário
    setIsAnonymous(false);
    setSigned(false);

    await firebase.auth().signOut();
  }

  // Melhorar isso, ainda não funciona
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
