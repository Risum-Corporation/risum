import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, Platform, Animated, View } from "react-native";

import { PostProps } from "../../database/interfaces";

import firebase from "../../database/firebaseConnection";

import { TopBar } from "../../components/TopBar";
import { MemeCard } from "../../components/MemeCard";
import StackContext from "../../contexts/Stack";
import { SafeZoneView } from "../../styles/Theme";
import AuthContext from "../../contexts/Auth";
import { Loading } from "../../components/Loading";

export function HypeTrain() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Objeto de memes recebidos do Firestore
  const [memeList, setMemeList] = useState<Record<string, PostProps>>({});

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { user } = useContext(AuthContext);

  async function loadPage(pageNumber = page) {
    // if (total && pageNumber > total) return;

    // Receber memes de cada perfil seguido pelo usuário e salvar na memeList
    const docs = await firebase.firestore().collection("memes").get();

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

      // Atualiza a lista de memes, acrescentando UM novo objeto referente a UM novo meme
      newMemes = {
        ...newMemes,
        [id]: {
          id,
          authorId,
          memeUrl,
          likes,
          memeTitle,
          tags,
          comments,
          isVideo,
        },
      };
    });

    setMemeList(newMemes);

    const totalItems = Object.keys(memeList).length;
    setTotal(Math.floor(totalItems / 5));
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    try {
      loadPage();
    } catch (error) {
      console.log(`Memes não encontrados devido ao erro: ${error}`);
      setLoading(false);
    }
  }, []);

  function refreshList() {
    setIsRefreshing(true);
    setLoading(true);

    // Zera o Objeto com os memes
    setMemeList({});

    loadPage(1);

    setIsRefreshing(false);
    setLoading(false);
  }

  const scrollY = new Animated.Value(0);
  const TOPBARHEIGHT = 90;
  const diffClamp = Animated.diffClamp(scrollY, 0, TOPBARHEIGHT);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -TOPBARHEIGHT],
  });
  return loading ? (
    <Loading />
  ) : (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <>
          {Platform.OS === "android" ? (
            <Animated.View
              style={{
                transform: [{ translateY }],
                zIndex: 150,
                position: "absolute",
                width: "100%",
                marginTop: 0,
              }}
            >
              <TopBar name="Feed" theme={isWhiteMode} />
            </Animated.View>
          ) : (
            <TopBar name="Feed" theme={isWhiteMode} />
          )}

          <View style={styles.memeList}>
            <FlatList
              data={Object.values(memeList)}
              keyExtractor={(post) => String(post.id)}
              onEndReached={() => loadPage()}
              onEndReachedThreshold={0.1}
              onRefresh={refreshList}
              showsVerticalScrollIndicator={false}
              refreshing={isRefreshing}
              renderItem={({ item }) => (
                <MemeCard postData={item} theme={isWhiteMode} />
              )}
              //maxToRenderPerBatch={5}
              onScroll={(e) => {
                scrollY.setValue(e.nativeEvent.contentOffset.y);
              }}
            />
          </View>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  memeList: {
    marginTop: Platform.OS === "android" ? 120 : 0,
  },
});
