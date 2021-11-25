import React, { createContext, useState, useEffect } from "react";

import * as Google from "expo-google-app-auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../database/firebaseConnection";

export interface User {
  userName: string; // Nome de exibição do usuário
  uid: string; // ID única do usuário
  tag: string; // Tag do usuário (#1234)
  avatar: string | null; // Imagem de perfil
  cover: string | null; // Imagem de fundo do perfil
  hyenaClanId: string | null; // ID da alcateia do usuário
  followers: string[]; // Array de IDs dos usuários que seguem o perfil
  following: string[]; // Array de IDs dos usuários seguidos
  likedMemes: string[]; // Array de IDs dos memes curtidos
  savedMemes: string[]; // Array de IDs dos memes salvos
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  isAnonymous: boolean;
  isEmailVerified: boolean;

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
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  async function handleStateChanged(firebaseUser: any) {
    //Verifica se o usuário é anônimo, de forma a escapar da requisição
    if (isAnonymous) {
      return setSigned(true);
    } else if (firebaseUser) {
      // Carregamento (deve esconder a tela de Welcome que aparece rapidão ao iniciar o app como já usuário)
      setLoading(true);

      // Faz login se o usuário já estiver conectado através da persistência
      login(firebaseUser);

      setLoading(false);
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(handleStateChanged);
  }, []);

  async function login(firebaseUser: any) {
    if (firebaseUser.isAnonymous || isAnonymous) {
      return setSigned(true);
    }

    //Ajusta as configurações de estado do usuário
    setIsAnonymous(false);
    setIsEmailVerified(firebaseUser.isEmailVerified);

    await firebase
      .firestore()
      .collection("users")
      .doc(firebaseUser.uid)
      .get()
      .then((doc) => {
        // Seguindo a interface User
        const userName = doc.data()?.userName;
        const tag = doc.data()?.tag;
        const avatar = doc.data()?.avatar;
        const cover = doc.data()?.cover;
        const hyenaClanId = doc.data()?.hyenaClanId;
        const following = doc.data()?.following;
        const followers = doc.data()?.followers;
        const likedMemes = doc.data()?.likedMemes;
        const savedMemes = doc.data()?.savedMemes;
        const uid = firebaseUser.uid;

        setUser({
          userName,
          uid,
          tag,
          avatar,
          cover,
          hyenaClanId,
          following,
          followers,
          likedMemes,
          savedMemes,
        });

        // Se você vir essa mensagem no console, quer dizer que tudo deu certo
        console.log("Fé na sogrinha login");

        // Navega para o StackRoutes
        setSigned(true);
      });
  }

  async function loginAnonymously() {
    // Ajusta primeiro as condições de estado do usuário, pois a função handleStateChanged só é chamada depois da requisição no firebase
    setIsAnonymous(true);

    await firebase
      .auth()
      .signInAnonymously()
      .then((cred) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE); // Remoção da persistência (usuário anônimo)
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
    setIsEmailVerified(false);

    // Volta para o Auth Routes
    setSigned(false);

    // Remoção da persistência
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

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
        isEmailVerified,
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
