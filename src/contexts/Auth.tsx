import React, { createContext, useState, useEffect } from "react";

import googleCloudStorage from "@google-cloud/storage";

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
  likedComments: string[]; // Array de IDs dos comentários curtidos
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
  updateUser(newUser: User): void;
  deleteAccount(password: string): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [shouldDeleteAccount, setShouldDeleteAccount] =
    useState<boolean>(false);

  async function handleStateChanged(firebaseUser: any) {
    // Verifica se a conta deve ser deletada
    if (shouldDeleteAccount) {
      signOut();
    }
    // Verifica se o usuário é anônimo, de forma a escapar da requisição
    else if (isAnonymous) {
      return setSigned(true);
    }
    // Verifica se existe um usuário no Auth para realizar Login
    else if (firebaseUser != null) {
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

    const user = firebase
      .firestore()
      .collection("users")
      .doc(firebaseUser.uid)
      .get();

    if ((await user).exists) {
      await user.then((doc) => {
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
        const likedComments = doc.data()?.likedComments;
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
          likedComments,
        });

        // Se você vir essa mensagem no console, quer dizer que tudo deu certo
        console.log("Fé na sogrinha login");

        // Navega para o StackRoutes
        setSigned(true);
      });
    } else {
      return setSigned(false);
    }
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
    setUser(null);

    //Ajusta as condições de estado do usuário
    setIsAnonymous(false);
    setIsEmailVerified(false);

    // Volta para o Auth Routes
    setSigned(false);

    // Remoção da persistência
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    await firebase.auth().signOut();
  }

  function updateUser(newUser: User) {
    setUser(newUser);
  }

  async function deleteAccount(password: string) {
    const auth = firebase.auth().currentUser;
    setShouldDeleteAccount(true);

    // Gera a credencial para posteriormente apagar o usuário
    const cred = firebase.auth.EmailAuthProvider.credential(
      auth?.email!,
      password
    );

    try {
      await auth?.reauthenticateWithCredential(cred);
    } catch (error) {
      return console.log(error);
    }

    // Deleta os memes postados pelo usuário
    await firebase
      .firestore()
      .collection("memes")
      .where("authorId", "==", auth?.uid)
      .get()
      .then((docs) => {
        docs.forEach(async (doc) => {
          const url = doc.data().memeUrl;

          // Deleta o meme do Storage
          await firebase.storage().refFromURL(url).delete();

          // Deleta o meme do Firestore
          await doc.ref.delete();
        });
      });

    // Deleta os arquivos (foto de perfil e cover) do usuário presentes no Storage
    if (user?.avatar) {
      await firebase.storage().refFromURL(user.avatar).delete();
    }
    if (user?.cover) {
      await firebase.storage().refFromURL(user.cover).delete();
    }

    // Deleta os comentários feitos pelo usuário
    await firebase
      .firestore()
      .collection("comments")
      .where("authorId", "==", auth?.uid)
      .get()
      .then((docs) => {
        docs.forEach(async (doc) => {
          // Atualiza o número de comentários
          const memeId = doc.data().memeId;

          await firebase
            .firestore()
            .collection("memes")
            .doc(memeId)
            .update({ comments: firebase.firestore.FieldValue.increment(-1) });

          await doc.ref.delete();
        });
      });

    // Deleta os likes dados pelo usuário
    if (user?.likedMemes) {
      await firebase
        .firestore()
        .collection("memes")
        .where("id", "in", user.likedMemes)
        .get()
        .then((docs) => {
          docs.forEach(async (doc) => {
            await doc.ref.update({
              likes: firebase.firestore.FieldValue.increment(-1),
            });
          });
        });
    }

    // Deleta o usuário do Firestore e do Authentication
    await firebase
      .firestore()
      .collection("users")
      .doc(auth?.uid)
      .delete()
      .then(() => {
        // Authentication
        auth?.delete;
        signOut();
      });
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
        updateUser,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
