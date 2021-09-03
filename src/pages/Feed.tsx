import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { posts } from "../database/fakeData";

import colors from "../styles/colors";
import { Image } from 'react-native';
import { Banner } from 'react-native-paper';
import { TopBar } from "../components/TopBar";
import { MemeCard } from "../components/MemeCard";
import { Loading } from "../components/Loading";

export function Feed() {
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
    
    <View style={styles.wrapper}>
      <TopBar name="Feed" />

      <FlatList
        data={posts}
        keyExtractor={(post) => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        renderItem={({ item }) => <MemeCard postData={item} />}
        maxToRenderPerBatch={5}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
  },

});
