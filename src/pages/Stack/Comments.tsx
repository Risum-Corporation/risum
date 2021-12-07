import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View, SafeAreaView } from "react-native";

import StackContext from "../../contexts/Stack";
import { CommentCard } from "../../components/CommentCard";
import { SafeZoneView } from "../../styles/Theme";

import { TextInput } from "react-native-paper";
import colors from "../../styles/colors";
import { ConfirmButton } from "../../components/ConfirmButton";

export function Comments() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Dados do comentário a ser digitado
  const [commentInput, setCommentInput] = useState<string>();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  function loadPage(pageNumber = page) {}

  useEffect(() => {
    loadPage();
  }, []);

  function refreshList() {
    setRefreshing(true);
    setLoading(true);

    loadPage(1);

    setRefreshing(false);
    setLoading(false);
  }

  function handlePostComment() {}

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.wrapper}>
          {/* <FlatList
            data={comments}
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
          /> */}
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
                  ? { backgroundColor: colors.lightBackgroundLight }
                  : {
                      backgroundColor: colors.lightBackground,
                      color: colors.white,
                      textDecorationColor: colors.white,
                    }
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
            <ConfirmButton
              title="Enviar"
              theme={isWhiteMode}
              onPress={() => {
                handlePostComment();
              }}
            />
          </SafeAreaView>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignContent: "center",

    maxWidth: "100%",
  },
  createCommentBox: {
    flexDirection: "row",
    width: 200,
  },
});
