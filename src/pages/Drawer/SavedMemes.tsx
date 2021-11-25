import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GoBackButton } from "../../components/GoBackButton";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { MemeCardSecondary } from "../../components/MemeCardSecondary";
import { PostProps } from "../../database/interfaces";
import StackContext from "../../contexts/Stack";
import { SafeZoneView } from "../../styles/Theme";
import AuthContext from "../../contexts/Auth";

import firebase from "../../database/firebaseConnection";
import { Loading } from "../../components/Loading";

export function SavedMemes() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [savedMemes, setSavedMemes] = useState<string[]>();
  const navigation = useNavigation();

  // Objeto de memes recebidos do Firestore
  const [memeList, setMemeList] = useState<Record<string, PostProps>>({});

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { user } = useContext(AuthContext);

  async function loadPage(pageNumber = page) {
    // if (total && pageNumber > total) return;

    // Receber memes salvos pelo usuário
    const docs = await firebase
      .firestore()
      .collection("memes")
      .where("id", "in", savedMemes)
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

    const totalItems = Object.keys(memeList).length;
    setMemeList(newMemes);
    setTotal(Math.floor(totalItems / 5));
    setPage(pageNumber + 1);
    setLoading(false);
  }

  function refreshList() {
    setIsRefreshing(true);
    setLoading(true);

    loadPage(1);

    // Zera o Objeto com os memes
    setMemeList({});

    setIsRefreshing(false);
    setLoading(false);
  }

  useEffect(() => {
    if (user?.savedMemes) {
      setSavedMemes(user.savedMemes);
      loadPage();
    }
  }, []);

  useEffect(() => {
    if (savedMemes?.length) {
      loadPage();
    } else {
      setLoading(false);
      console.log("Sem memes salvos");
    }
  }, [savedMemes]);

  return loading ? (
    <Loading />
  ) : (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View>
          <GoBackButton
            theme={isWhiteMode}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.heading}>
            <Text
              style={[
                styles.title,
                isWhiteMode
                  ? { color: colors.greenLight }
                  : { color: colors.green },
              ]}
            >
              Memes Salvos
            </Text>
            <View style={styles.savedMemes}>
              <FlatList
                data={Object.values(memeList)}
                keyExtractor={(post) => String(post.id)}
                onEndReached={() => loadPage()}
                onRefresh={refreshList}
                refreshing={isRefreshing}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={5}
                renderItem={({ item }) => (
                  <MemeCardSecondary postData={item} theme={isWhiteMode} />
                )}
              />
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginHorizontal: 50,
  },
  title: {
    fontFamily: fonts.heading,
    fontWeight: "bold",
    fontSize: 25,
    marginTop: "30%",
  },
  savedMemes: {
    marginTop: 20,
  },
  searchBar: {
    marginTop: 100,
  },
});
