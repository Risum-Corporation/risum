import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../styles/colors";

import { HypeTrainCard } from "../components/HypeTrainCard";

import { posts } from "../database/fakeData";

export function HypeTrain() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  function loadPage(pageNumber = page) {
    if (total && pageNumber > total) return;

    const totalItems = posts.length;

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

  const [visible, setVisible] = React.useState(true);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(post) => String(post.id)}
        onEndReached={() => loadPage()}
        horizontal={true}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        renderItem={({ item }) => <HypeTrainCard postData={item} />}
        maxToRenderPerBatch={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.background,
  },
});
