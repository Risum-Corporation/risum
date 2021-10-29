import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";

import { fakePosts, PostProps } from "../../database/fakeData";

import { TopBar } from "../../components/TopBar";
import { MemeCard } from "../../components/MemeCard";
import StackContext from "../../contexts/Stack";
import { Loading } from "../../components/Loading";
import { SafeZoneView } from "../../styles/Theme";

import firebase from "../../database/firebaseConnection";

export function Feed() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [memeList, setMemeList] = useState<PostProps[]>();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  function loadPage(pageNumber = page) {
    //if (total && pageNumber > total) return;
    // Receber perfis que o usuário segue

    // Receber memes de cada perfil e salvar na memeList
    // firebase
    // .firestore()
    // .collection("media")
    // .get()
    // .then((docs) => {
    //   // // Percorre os documentos (usuários) um a um
    //   // docs.forEach((doc) => {
    //   //   console.log(doc);
    //   // });
    // })
    // .catch((error) => {
    //   console.log(`Deu ruim: ${error}`);
    // });

    const totalItems = fakePosts.length;

    setTotal(Math.floor(totalItems / 5));
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  function refreshList() {
    setRefreshing(true);

    loadPage(1);

    setRefreshing(false);
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <>
          <TopBar theme={isWhiteMode} name="Feed" />

          <View>
            {loading || refreshing ? (
              <Loading />
            ) : (
              <FlatList
                data={fakePosts}
                keyExtractor={(post: PostProps) => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                onRefresh={refreshList}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
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
