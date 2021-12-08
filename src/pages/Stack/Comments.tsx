import React, { useState, useEffect, useContext, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";

import firebase from "../../database/firebaseConnection";

import { CommentProps } from "../../database/interfaces";

import StackContext from "../../contexts/Stack";
import { CommentCard } from "../../components/CommentCard";
import { SafeZoneView } from "../../styles/Theme";

import { TextInput } from "react-native-paper";
import colors from "../../styles/colors";
import { ConfirmButton } from "../../components/ConfirmButton";
import AuthContext from "../../contexts/Auth";
import fonts from "../../styles/fonts";

// route.params.memeId para dinamizar a tela de comentários para vários memes diferentes
export function Comments({ route }: any) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentMemeId, setCurrentMemeId] = useState<string>(
    route.params.memeId
  );

  // Dados do comentário a ser digitado
  const [commentInput, setCommentInput] = useState<string>();

  // Objeto de comentários recebidos do Firestore
  const [commentList, setCommentList] = useState<Record<string, CommentProps>>(
    {}
  );

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { user } = useContext(AuthContext);

  async function loadPage(pageNumber = page) {
    // Receber memes salvos pelo usuário
    const docs = await firebase
      .firestore()
      .collection("comments")
      .where("memeId", "==", currentMemeId)
      .get();

    // Verifica se existem de fato comentários para aquele meme
    if (docs) {
      let newComments = { ...commentList };

      // Percorre os documentos (comentários) um a um
      docs.forEach((doc) => {
        // Recebe cada uma das informações do comentário no Firestore
        const id = doc.data().id;
        const memeId = doc.data().memeId;
        const authorId = doc.data().authorId;
        const likes = doc.data().likes;
        const content = doc.data().content;

        // Atualiza a lista de memes, acrescentando UM novo objeto referente a UM novo meme
        newComments = {
          ...newComments,
          [id]: {
            id,
            memeId,
            authorId,
            likes,
            content,
          },
        };
      });

      const totalItems = Object.keys(commentList).length;
      setCommentList(newComments);
      setTotal(Math.floor(totalItems / 5));
      setPage(pageNumber + 1);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  function refreshList() {
    setRefreshing(true);
    setLoading(true);

    setCommentList({});
    loadPage(1);

    setRefreshing(false);
    setLoading(false);
  }

  async function handlePostComment() {
    // Verifica se o comentário é válido
    if (
      commentInput != "" &&
      commentInput != null &&
      commentInput.replace(/\s/g, "").length
    ) {
      // ID única do comentário com 27 caracteres (9 + 9 + 9)
      const commentId =
        Math.random().toString(36).substr(2, 9) +
        Math.random().toString(36).substr(2, 9) +
        Math.random().toString(36).substr(2, 9);

      await firebase
        .firestore()
        .collection("comments")
        .doc(commentId)
        .set({
          id: commentId,
          memeId: currentMemeId,
          authorId: user?.uid,
          likes: 0,
          content: commentInput,
        })
        .then(async () => {
          await firebase
            .firestore()
            .collection("memes")
            .doc(currentMemeId)
            .update({ comments: firebase.firestore.FieldValue.increment(1) })
            .then(() => {
              refreshList();
              setCommentInput("");
            });
        });
    }
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.wrapper}>
          <View style={styles.commentList}>
            <FlatList
              data={Object.values(commentList)}
              keyExtractor={(post) => String(post.id)}
              onEndReached={() => loadPage()}
              onEndReachedThreshold={0.1}
              onRefresh={refreshList}
              showsVerticalScrollIndicator={false}
              refreshing={refreshing}
              renderItem={({ item }) => (
                <CommentCard postData={item} theme={isWhiteMode} />
              )}
              maxToRenderPerBatch={5}
            />
          </View>

          <SafeAreaView style={styles.createCommentBox}>
            <TextInput
              mode={"flat"}
              value={commentInput}
              clearTextOnFocus
              onChangeText={(commentInput: string) =>
                setCommentInput(commentInput)
              }
              placeholder="Diga algo sobre este meme..."
              placeholderTextColor={
                isWhiteMode
                  ? colors.placeholderTextLight
                  : colors.placeholderText
              }
              underlineColor={"transparent"}
              style={
                isWhiteMode
                  ? [
                      styles.input,
                      { backgroundColor: colors.lightBackgroundLight },
                    ]
                  : [
                      styles.input,
                      {
                        backgroundColor: colors.lightBackground,
                        color: colors.white,
                        textDecorationColor: colors.white,
                      },
                    ]
              }
              selectionColor={colors.divider}
              theme={{
                colors: {
                  text: isWhiteMode ? colors.whiteLight : colors.white,
                  primary: isWhiteMode ? colors.greenLight : colors.green,
                  placeholder: isWhiteMode ? colors.whiteLight : colors.white,
                },
              }}
              maxLength={140}
            />
            <TouchableOpacity
              style={
                isWhiteMode
                  ? [styles.button, { backgroundColor: colors.greenLight }]
                  : [styles.button, { backgroundColor: colors.green }]
              }
              onPress={() => {
                handlePostComment();
              }}
            >
              <Text
                style={
                  isWhiteMode
                    ? [styles.text, { color: colors.backgroundLight }]
                    : [styles.text, { color: colors.background }]
                }
              >
                Enviar
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",

    maxWidth: "100%",
  },
  createCommentBox: {
    flexDirection: "row",

    width: "100%",
    height: "10%",
  },
  button: {
    width: "20%",

    justifyContent: "center",
    alignItems: "center",

    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  input: {
    width: "80%",

    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  commentList: {
    height: "90%",
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.heading,
  },
});
