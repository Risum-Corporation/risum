import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";

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
  const { user } = useContext(AuthContext);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  function loadPage(pageNumber = page) {
    //if (total && pageNumber > total) return;
    // Receber perfis que o usuário segue

    // Receber memes de cada perfil e salvar na memeList
    firebase
      .firestore()
      .collection("memes")
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
          const authorId = doc.data().authorId; // Fazer com que esse seja requisitado diretamente do Firebase depois

          // Atualiza a lista de memes, acrescentando UM novo objeto referente a UM novo meme
          setMemeList([
            ...memeList,
            { id, authorId, memeUrl, likes, memeTitle, tags, comments },
          ]);
          console.log(memeList);
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
    loadPage();
  }, []);

  function refreshList() {
    setIsRefreshing(true);

    // Reseta a lista de memes
    setMemeList([]);
    console.log(memeList);

    loadPage(1);

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
            ) : (
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

              // // Listagem dos posts no Feed
              // fakePosts.map((post) => (
              //   <View key={post.id}>
              //     <MemeCard theme={isWhiteMode} postData={{ ...post }} />
              //   </View>
              // ))
            )}
          </View>
        </>
      }
    />
  );
}
