import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import colors from "../styles/colors";

import { TopBar } from "../components/TopBar";
import { MemeCard } from "../components/MemeCard";
import { Loading } from "../components/Loading";

export function Feed() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    const response = await fetch(
      `http:localhost:3000/feed?expand=author&_limit=5&_page=${pageNumber}`
    );

    const data = await response.json();
    const totalItems = Number(response.headers.get("X-Total-Count"));

    setTotal(Math.floor(totalItems / 5));
    setFeed(shouldRefresh ? data : [...feed, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  return (
    <View style={styles.wrapper}>
      <TopBar name="Feed" />
      <FlatList
        data={feed}
        keyExtractor={(post) => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => <MemeCard postData={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
  },
});
