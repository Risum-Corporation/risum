import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View, Platform, Animated, Dimensions } from "react-native";

import { fakePosts } from "../../database/fakeData";

import { PostProps } from "../../database/fakeData";

import firebase from "../../database/firebaseConnection";

import colors from "../../styles/colors";
import { TopBar } from "../../components/TopBar";
import { MemeCard } from "../../components/MemeCard";
import StackContext from "../../contexts/Stack";
import { SafeZoneView } from "../../styles/Theme";
import AuthContext from "../../contexts/Auth";
import { HypeMemeCard } from "../../components/HypeMemeCard";
export function HypeTrain() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Objeto de memes recebidos do Firestore
  const [memeList, setMemeList] = useState<Record<string, PostProps>>({});

  // Array de IDs dos usuários seguidos
  const [following, setFollowing] = useState<string[]>();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { user } = useContext(AuthContext);

  async function loadPage(pageNumber = page) {
    // if (total && pageNumber > total) return;

    // Receber perfis que o usuário segue

    // Receber memes de cada perfil seguido pelo usuário e salvar na memeList
    const docs = await firebase
      .firestore()
      .collection("memes")
      //.where("authorId", "in", following)
      .get();
    let newMemes = { ...memeList };
    // Percorre os documentos (memes) um a um
    docs.forEach((doc) => {
      // Recebe cada uma das informações do meme no Firestore
      const id = doc.data().id;
      const memeUrl = doc.data().memeUrl;
      const memeTitle = doc.data().memeTitle;
      const tags = doc.data().tags;
      const likes = doc.data().likes;
      const comments = doc.data().comments;
      const authorId = doc.data().authorId;
      const isVideo = doc.data().isVideo;
      // console.log({ id, authorId, memeUrl, likes, memeTitle, tags, comments })
      // Atualiza a lista de memes, acrescentando UM novo objeto referente a UM novo meme
      newMemes = {
        ...newMemes,
        [id]: { id, authorId, memeUrl, likes, memeTitle, tags, comments, isVideo },
      };
    });
    // console.log(newMemes)
    const totalItems = Object.keys(memeList).length;
    setMemeList(newMemes);
    setTotal(Math.floor(totalItems / 5));
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    let shouldSet = true;
    async function fetchFollowedUsers() {
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .get();
      if (shouldSet) {
        const followingList = [...doc.data()?.following];
        setFollowing(followingList);
      }
    }

    // Recebe a lista de perfis que o usuário segue
    fetchFollowedUsers().then(() => {
      if (following?.length) {
        loadPage();
      }
    });

    // Primeiro carregamento da Flatlist
    return () => {
      shouldSet = false;
    };
  }, []);

  function refreshList() {
    setIsRefreshing(true);

    loadPage(1);

    // Zera o Objeto com os memes
    setMemeList({});

    setIsRefreshing(false);
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <>

          <FlatList
            data={Object.values(memeList)}
            renderItem={({ item }) => (
              <HypeMemeCard postData={item} theme={isWhiteMode} />
            )}
            keyExtractor={(post) => String(post.id)}
            onEndReached={() => loadPage()}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            snapToInterval={Dimensions.get('window').height -120}
            snapToAlignment={'start'}
            maxToRenderPerBatch={1}
            decelerationRate={'fast'}
          /> 
          </>



      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250, 
    height: 250,
  },
  video: {
    height: 400,
    width: 400
  }
});
