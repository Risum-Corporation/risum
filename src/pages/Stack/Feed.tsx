import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, Text } from "react-native";

import { fakePosts, PostProps } from "../../database/fakeData";

import { TopBar } from "../../components/TopBar";
import { MemeCard } from "../../components/MemeCard";
import StackContext from "../../contexts/Stack";
import { Loading } from "../../components/Loading";
import { SafeZoneView } from "../../styles/Theme";

import firebase from "../../database/firebaseConnection";
import AuthContext from "../../contexts/Auth";

export function Feed() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [memeList, setMemeList] = useState<PostProps[]>([]);

  // Array de IDs dos usuários seguidos
  const [following, setFollowing] = useState<string[]>();

  // Theme
  const { isWhiteMode } = useContext(StackContext);
  const { user } = useContext(AuthContext);

  function loadPage(pageNumber = page) {
    //if (total && pageNumber > total) return;
    // Receber perfis que o usuário segue

    // Receber memes de cada perfil seguido pelo usuário e salvar na memeList
    firebase
      .firestore()
      .collection("memes")
      .where("authorId", "in", following)
      .get()
      .then((docs) => {
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

          // Atualiza a lista de memes, acrescentando UM novo objeto referente a UM novo meme
          setMemeList([
            ...memeList,
            { id, authorId, memeUrl, likes, memeTitle, tags, comments },
          ]);
        });
      })
      .catch((error) => {
        console.log(`Deu ruim: ${error}`);
      });

    const totalItems = fakePosts.length;

    setTotal(Math.floor(totalItems / 5));
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    async function fetchFollowedUsers() {
      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .get()
        .then((doc) => {
          const followingList = [...doc.data()?.following];
          setFollowing(followingList);
        });
    }

    // Recebe a lista de perfis que o usuário segue
    fetchFollowedUsers();

    // Primeiro carregamento da Flatlist
    if (following) {
      loadPage();
    }
  });

  function refreshList() {
    setIsRefreshing(true);

    // Reseta a lista de memes
    setMemeList([]);

    if (following) {
      loadPage(1);
    }

    setIsRefreshing(false);
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <>
          <TopBar theme={isWhiteMode} name="Feed" />

          <View>
            {loading || isRefreshing ? (
              <Loading />
            ) : following ? (
              <FlatList
                data={memeList}
                keyExtractor={(post: PostProps) => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                onRefresh={() => {
                  refreshList();
                }}
                refreshing={isRefreshing}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <MemeCard theme={isWhiteMode} postData={item} />
                )}
                maxToRenderPerBatch={5}
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 36 }}>
                  Você ainda não segue nenhum usuário
                </Text>
              </View>
            )}
          </View>
        </>
      }
    />
  );
}
