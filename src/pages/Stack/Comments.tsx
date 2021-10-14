import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";

import { posts } from '../../database/fakeData'
import { comments } from "../../database/fakeData";

import colors from "../../styles/colors";
import StackContext from "../../contexts/Stack";
import { GoBackButton } from "../../components/GoBackButton";
import { CommentCard } from "../../components/CommentCard";
import { MemeCardSecondary } from "../../components/MemeCardSecondary";

export function Comments() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  function loadPage(pageNumber = page) {
    if (total && pageNumber > total) return;

    const totalItems = comments.length;

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
    <View
      style={
        isWhiteMode
          ? [styles.wrapper, { backgroundColor: colors.backgroundLight }]
          : [styles.wrapper, { backgroundColor: colors.background }]
      }
    >
      <GoBackButton theme={isWhiteMode} />



      <FlatList
        data={comments}
        keyExtractor={(post) => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <>
            <CommentCard postData={item} theme={isWhiteMode} />
          </>
        )}
        maxToRenderPerBatch={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
});
