import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, Platform, Animated, View } from "react-native";

import { ReducedPostProps } from "../../database/interfaces";

import firebase from "../../database/firebaseConnection";

import { TopBar } from "../../components/TopBar";
import { MemeCard } from "../../components/MemeCard";
import StackContext from "../../contexts/Stack";
import { SafeZoneView } from "../../styles/Theme";
import AuthContext from "../../contexts/Auth";
import { Loading } from "../../components/Loading";
import { NotFollowingUsers } from "../../components/NotFollowingUsers";
import EmailVerify from "../../components/EmailVerify";

export function Feed() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notFollowingUsers, setNotFollowingUsers] = useState(false);

  // Objeto de memes recebidos do Firestore
  const [memeList, setMemeList] = useState<Record<string, ReducedPostProps>>(
    {}
  );

  // Array de IDs dos usuários seguidos
  const [following, setFollowing] = useState<string[]>();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { user } = useContext(AuthContext);

  async function loadPage(pageNumber = page) {
    // if (total && pageNumber > total) return;

    if (following) {
      // Receber memes de cada perfil seguido pelo usuário e salvar na memeList
      const docs = await firebase
        .firestore()
        .collection("memes")
        .where("authorId", "in", following)
        .get();

      let newMemes = { ...memeList };

      // Percorre os documentos (memes) um a um
      docs.forEach((doc) => {
        // Recebe cada uma das informações do meme no Firestore
        const id = doc.data().id;
        const memeUrl = doc.data().memeUrl;
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
            comments,
            isVideo,
          },
        };
      });

      setMemeList(newMemes);
    } else {
      return setNotFollowingUsers(true);
    }

    const totalItems = Object.keys(memeList).length;
    setTotal(Math.floor(totalItems / 5));
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    let shouldSet = true;
    async function fetchFollowedUsers() {
      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .get()
        .then((doc) => {
          if (shouldSet) {
            const followingList = [...doc.data()?.following];
            setFollowing(followingList);
            setNotFollowingUsers(false);
          }
        })
        .catch((error) => {
          console.log(`Ops! Algo deu errado: ${error}`);
        });
    }

    fetchFollowedUsers();

    // Força o useEffect a rodar apenas uma vez
    return () => {
      shouldSet = false;
    };
  }, []);

  useEffect(() => {
    if (following?.length) {
      loadPage();
    } else {
      console.log("Sem seguidores");
      setLoading(false);
      setNotFollowingUsers(true);
    }
  }, [following]);

  function refreshList() {
    setIsRefreshing(true);
    setLoading(true);

    if (following?.length) {
      loadPage(1);
    }

    // Zera o Objeto com os memes
    setMemeList({});

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

  // Utilizado na verificação de e-mail
  const auth = firebase.auth().currentUser;

  return loading ? (
    <Loading />
  ) : (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <>
          <Animated.View
            style={{
              transform: [{ translateY }],
              zIndex: 150,
              position: "absolute",
              width: "100%",
              marginTop: Platform.OS === "ios" ? 47 : 0,
            }}
          >
            <TopBar name="Feed" theme={isWhiteMode} />
          </Animated.View>
          {!auth?.emailVerified && <EmailVerify theme={isWhiteMode} />}

          {notFollowingUsers ? (
            <NotFollowingUsers />
          ) : (
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
                maxToRenderPerBatch={5}
                onScroll={(e) => {
                  scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
              />
            </View>
          )}
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  memeList: {
    marginTop: 120,
  },
});
